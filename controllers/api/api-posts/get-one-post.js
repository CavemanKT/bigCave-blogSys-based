const { authenticateCurrentUserByToken , post: { getPostById } } = require('../../_helpers')
const { Comment, User } = require('../../../models')

const showCurrentUser = async function(req, res) {
  const { locals: { currentPost } } = res
  const { locals: { currentUser } } = res

  const results = await Comment.findAndCountAll({
    where: {
      PostId: currentPost.id
    },
    order: [['createdAt', 'DESC']],
  })

  const postUser = await User.findOne({
    where: {
      id: currentPost.UserId
    }
  })

  res.render('api/posts/show', {
    comments: results.rows,
    post: currentPost,
    user: postUser,
    layout: false
  })
}

module.exports = [authenticateCurrentUserByToken('snippet'), getPostById('modal'), showCurrentUser]
