const { Post } = require('../../../models')

module.exports = function(format, options = {}) {
  return async function (req, res, next) {
    const { locals: { currentUser } } = res
    const { params: { id } } = req
    const post = await Post.findOne({
      where: {
        id: Number(id) || 0,
        UserId: currentUser.id
      },
      include: {
        association: Post.Comments
      },
      order: [['createdAt', 'DESC']],
      ...options
    })

    if (!post) {
      if (format === 'modal') {
        return res.render('api/posts/not-found', { layout: false })
      }

      if (format === 'json') {
        return res.status(404).json({ message: `Post of ID ${id} not found!` })
      }
    }

    res.locals.currentPost = post

    next()
  }
}
