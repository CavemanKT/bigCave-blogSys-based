const { authenticateCurrentUserByToken , myPost: { getCurrentUserPostById } } = require('../../_helpers')
const { Comment } = require('../../../models')

const showCurrentUser = async function(req, res) {
  const { locals: { currentPost } } = res
  const { locals: { currentUser } } = res

  const results = await Comment.findAndCountAll({
    where: {
      PostId: currentPost.id
    },
    order: [['createdAt', 'DESC']],
    // limit,
  })

  // console.log('results.rows: ', results.rows);
  res.render('api/my-posts/show', {
    comments: results.rows,
    post: currentPost,
    user: currentUser,
    layout: false
  })
}

module.exports = [authenticateCurrentUserByToken('html'), getCurrentUserPostById('modal'), showCurrentUser]
