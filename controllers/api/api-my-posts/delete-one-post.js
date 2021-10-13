const { authenticateCurrentUserByToken , myPost: { getCurrentUserPostById } } = require('../../_helpers')
const { Comment } = require('../../../models')


const destroyMyPost = async function(req, res) {
  const { locals: { currentPost } } = res
  const { params: { id } } = req

  await currentPost.destroy()
  await Comment.destroy({ where: { PostId: id } })
  res.status(204).json()
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserPostById('json'), destroyMyPost]
