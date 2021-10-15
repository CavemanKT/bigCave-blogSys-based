const { body } = require('express-validator')
const MulterParser = require('../../../services/MulterParser')

const {
  authenticateCurrentUserByToken,
  checkValidation
} = require('../../_helpers')

const { Post } = require('../../../models')  // models
const { Comment } = require('../../../models')

const permittedParams = {
  Post: ['title', 'content'],
  Comments: ['content']
}

const validation = [
  body('title')
    .isString().withMessage('Title must be a String')
    .notEmpty().withMessage('Title is Required'),
  body('content')
    .isString().withMessage('Content must be a String')
    .notEmpty().withMessage('Content is Required'),
]

const createMyPosts = async function(req, res) {
// fetch all the posts data from db regardless of the currentUser
// create data
  const { locals: { currentUser } } = res
  const { body: postParams } = req

  const newPost = await currentUser.createPost({
    ...postParams,
  }, {
    fields: permittedParams.Post,
    include: {
      association: Post.Comments
    }
  })

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
