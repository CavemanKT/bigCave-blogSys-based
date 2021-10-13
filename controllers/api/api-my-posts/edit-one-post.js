const { authenticateCurrentUserByToken , myPost: { getCurrentUserPostById } } = require('../../_helpers')

const myPostEdit = async function(req, res) {
  const { locals: { currentPost } } = res
  res.render('api/my-posts/edit', { post: currentPost, layout: false })
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserPostById('modal'), myPostEdit]
