const { authenticateCurrentUserByToken , myPost: { getCurrentUserPostById } } = require('../../_helpers')
const { Comment, Post } = require('../../../models')

const showCurrentUser = async function(req, res) {
  const { locals: { currentPost } } = res

  // const comments = await Comment.findAll({
  //   where: {
  //     PostId: currentPost.id
  //   },
  //   order: [['createdAt', 'DESC']],
  //   // limit,
  // })
  console.log(currentPost.User.avatar);
  res.render('api/my-posts/show', {
    post: currentPost,
    layout: false
  })
}

module.exports = [
  authenticateCurrentUserByToken('html'),
  getCurrentUserPostById('modal', {  // you can always delete the options part to adapt the feature of limiting the amount of comments when you hit the show page
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
