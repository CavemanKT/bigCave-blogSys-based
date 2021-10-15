const { Post } = require('../../../models')

module.exports = function(format, options = {}) {
  return async function (req, res, next) {
    const { params: { id } } = req
    const post = await Post.findOne({
      where: { id: Number(id) || 0 },
      order: [['createdAt', 'DESC']],
      ...options
    })
    // console.log(id);

    if (!post) {
      if (format === 'modal') {
        return res.render('api/posts/not-found', { layout: false })
      }

      if (format === 'json') {
        return res.status(404).json({ message: `Post of ID ${id} not found!` })
      }
    }

    res.locals.currentPost = post
    // console.log('post: ', post.UserId);
    next()
  }
}
