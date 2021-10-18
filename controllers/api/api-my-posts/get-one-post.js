const { authenticateCurrentUserByToken , myPost: { getCurrentUserPostById } } = require('../../_helpers')
const { Comment, Post } = require('../../../models')
const comment = require('../../../models/schema/comment')

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

  const onePost = await Post.findOne({
    where: {
      id: currentPost.id
    },
    include: {
    association: Post.Comments,
    include: {
      association: Comment.Children,
      include: Comment.Children
    }
  }
})

console.log(onePost.Comments[2].Parent);

  res.render('api/my-posts/show', {
    onePost,
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
