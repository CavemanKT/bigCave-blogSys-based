const { authenticateCurrentUserByToken , myPost: { getCurrentUserPostById } } = require('../../_helpers')

const showCurrentUser = async function(req, res) {
  const { locals: { currentPost } } = res
  res.render('api/my-posts/show', { post: currentPost, layout: false })
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserPostById('modal'), showCurrentUser]
