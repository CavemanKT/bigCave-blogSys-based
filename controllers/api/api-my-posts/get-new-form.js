const { authenticateCurrentUserByToken } = require('../../_helpers')

const { Post, Comment } = require('../../../models')

const compose = async function(req, res) {

  const post = await Post.build({
    Comments: []
  }, {
    include: Post.Comments
  })
  post.Comments.push(await Comment.build())



  res.render('_partials/compose-modal', { layout: false })
}

module.exports = [authenticateCurrentUserByToken('json'), compose]
