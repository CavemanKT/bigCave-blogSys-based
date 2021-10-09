const { authenticateCurrentUserByToken } = require('../../_helpers')
const { Post } = require('../../../models')  // models

const myPosts = async function(req, res) {
  const { locals: { currentUser } } = res
  const limit = 15
  const results = await Post.findAndCountAll({
    where: {
      UserId: currentUser.id
    },
    order: [['createdAt', 'DESC']],
    limit
  })
// fetch my own posts data from db regarding to the currentUser


  res.render('pages/my-posts/my-posts', {posts: results.rows})
}

module.exports = [authenticateCurrentUserByToken('html'), myPosts]
