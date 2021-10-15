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
  let fullname = ''

  // search results of offset
  const dbOffset = await User.findOne({
    where: {
      id: currentUser.id
    }
  })

  offset = Number(dbOffset.offset) + Number(addition)

  const results = await Post.findAndCountAll({
    where: {
      UserId: currentUser.id
    },
    order: [['createdAt', 'DESC']],
    limit,
    offset
  })


  // update dbOffset
  if ( results.rows !== null ){
    await currentUser.update( {offset: offset}, { fields: permittedChangeParams.offset })
  }

  // search the currentUser's full name
    const resultOfOneUser = await User.findOne({
    where: {
      id: currentUser.id
    }
  })

  if (resultOfOneUser.firstName == null && resultOfOneUser.lastName == null) {
    fullname = false
  } else {
    fullname = `${resultOfOneUser.firstName} ${resultOfOneUser.lastName}`
  }

  res.render('pages/my-posts/my-posts', {
    posts: results.rows,
    FullName: fullname
  })
}

module.exports = [
  MulterParser.none(),
  offsetSetting,
  authenticateCurrentUserByToken('json')
]
