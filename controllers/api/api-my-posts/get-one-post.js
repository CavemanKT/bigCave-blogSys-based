const { authenticateCurrentUserByToken , myPost: { getCurrentUserPostById } } = require('../../_helpers')
const { Comment, Post } = require('../../../models')

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

  comments.forEach((comment, i) => {
    currentPost.Comments[i].user = comment.User
  });


  res.render('api/my-posts/show', {
    comments,
    post: currentPost,
    layout: false
  })
}

module.exports = [
  authenticateCurrentUserByToken('html'),
  getCurrentUserPostById('modal', {
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
