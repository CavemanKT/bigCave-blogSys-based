const { Post, User } = require('../../../models')  // models
const { authenticateCurrentUserByToken } = require('../../_helpers')

const offsetSetting = async function(req, res) {
  const limit = 5
  const offset = Number(req.query.offset) || 0

  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset
  })

  res.render('api/posts/offset-setting', { posts: posts, newOffset: offset + posts.length, layout: false })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  offsetSetting
]
