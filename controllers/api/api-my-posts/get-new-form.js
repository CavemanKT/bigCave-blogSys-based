const { authenticateCurrentUserByToken } = require('../../_helpers')

const { Post } = require('../../../models')

const compose = async function(req, res) {
  const post = await Post.build({

  },{
    include: Post.Comments
  })

  res.render('api/my-posts/compose', { layout: false })
}

module.exports = [authenticateCurrentUserByToken('json'), compose]
