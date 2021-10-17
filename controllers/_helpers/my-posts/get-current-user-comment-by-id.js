const { User, Post, Comment } = require('../../../models')

module.exports = function(format, options = {}) {
  return async function (req, res, next) {
    const { locals: { currentUser } } = res
    const { params: { id } } = req
    const comment = await Comment.findOne({
      where: {
        id: Number(id) || 0,
        UserId: currentUser.id
      },
      order: [['createdAt', 'DESC']],
      ...options
    })

    if (!comment) {
      if (format === 'modal') {
        return res.render('api/posts/not-found', { layout: false })
      }

      if (format === 'json') {
        return res.status(404).json({ message: `Post of ID ${id} not found!` })
      }
    }

    res.locals.currentComment = comment

    next()
  }
}
