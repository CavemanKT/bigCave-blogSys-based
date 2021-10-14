const { Post, User } = require('../../../models')  // models
const { authenticateCurrentUserByToken } = require('../../_helpers')
const MulterParser = require('../../../services/MulterParser')


const permittedChangeParams = {
  offset: ['offset']
}

const offsetSetting = async function(req, res) {
  const { params: {addition} } = req
  const limit = 5

  const { locals:{ currentUser } } = res

  let offset = 0

  // search results of offset
  const dbOffset = await User.findOne({
    where: {
      id: currentUser.id
    }
  })

  offset = Number(dbOffset.offset) + Number(addition)

  const results = await Post.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset
  })

  // update dbOffset
  if ( results.rows !== null ){
    await currentUser.update( {offset: offset}, { fields: permittedChangeParams.offset })
  }

  res.render('pages/all-posts/home', {posts: results.rows })
}

module.exports = [
  MulterParser.none(),
  offsetSetting,
  authenticateCurrentUserByToken('json')
]
