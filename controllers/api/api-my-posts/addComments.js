const { body } = require('express-validator')
const MulterParser = require('../../../services/MulterParser')

const {
  authenticateCurrentUserByToken,
  checkValidation
} = require('../../_helpers')

const { Post } = require('../../../models')
const { Comment } = require('../../../models')

const permittedParams = [
  'content'
]

const validation = [
  body('content')
    .isString().withMessage('Comment must be a String')
    .notEmpty().withMessage('Comment is Required'),
]

const createMyPosts = async function(req, res) {
// fetch all the posts data from db regardless of the currentUser
// create data
  const { locals: { currentUser } } = res
  const { body: postParams } = req
// ==================== I am halfway to finish the creating comment
  const newPost = await Post.create({
    ...postParams,
  }, {
    fields: permittedParams,
    include: {
      association: Post.Comments
    }
  })

  newPost.setUser(currentUser)   // to set the UserId

  // the page will be located to /api/my-posts using views/_partials/navbar.ejs (window.location.href)

  res.redirect('/api/my-posts')
}

module.exports = [
  MulterParser.none(),
  authenticateCurrentUserByToken('html'),
  validation,
  checkValidation,
  createMyPosts
]
