const { authenticateCurrentUserByToken , post: { getPostById } } = require('../../_helpers')
const { Post, Comment } = require('../../../models')

const showPost = async function(req, res) {
  const { locals: { currentPost } } = res

  const comments = await Comment.findAll({
    where: {
      PostId: currentPost.id
    },
    include: {
      association: Post.User,
      include: {
        association: Post.Comments,
      }
    },
    order: [['createdAt', 'DESC']]
  })


  res.render('api/my-posts/show', {
    comments,
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
  showPost
]
