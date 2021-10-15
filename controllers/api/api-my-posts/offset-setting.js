const { Post, User } = require('../../../models')  // models
const { authenticateCurrentUserByToken } = require('../../_helpers')

const offsetSetting = async function(req, res) {
  const { locals: { currentUser } } = res
  const limit = 5
  const offset = Number(req.query.offset) || 0
  const posts = await Post.findAll({
    where: {
      UserId: currentUser.id
    },
    order: [['createdAt', 'DESC']],
    limit,
    offset
  })


  res.render('api/my-posts/offset-setting', {
    posts: posts,
    newOffset: offset + posts.length,
    layout: false
  })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  offsetSetting
]
