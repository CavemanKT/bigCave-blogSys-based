const { authenticateCurrentUserByToken , post: { getPostById } } = require('../../_helpers')
const { Post } = require('../../../models')

const showCurrentUser = async function(req, res) {
  const { locals: { currentPost } } = res

  res.render('api/posts/show-copy', {
    post: currentPost,
    layout: false
  })
}

module.exports = [
  authenticateCurrentUserByToken('snippet'),
  getPostById('modal', {
    order: [['Comments', 'createdAt', 'DESC']],
    include: [
      {
        association: Post.Comments,
      }, {
        association: Post.User
      }
    ]
  }),
  showCurrentUser
]
