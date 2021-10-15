const { body, check } = require('express-validator')
const MulterParser = require('../../../services/MulterParser')

const {
  authenticateCurrentUserByToken,
  checkValidation,
  post: { getPostById }
} = require('../../_helpers')

const { Post, Comment, User } = require('../../../models')

const permittedParams = [
  'content',
  'UserId',
  'PostId'
]

const validation = [
  check('content')
    .isString({min: 10}).withMessage('Comment must be a String')
    .notEmpty().withMessage('Comment is Required'),
]

const addComments = async function(req, res) {
// fetch all the posts data from db regardless of the currentUser
// create data
  const { locals: { currentPost, currentUser } } = res
  const { body: commentParam } = req

  const newComment = await Comment.create({
    UserId: currentUser.id,
    PostId: currentPost.id,
    ...commentParam,
  }, {
    fields: permittedParams,
    include: {
      association: Post.Comments
    }
  })
  // when I hit the reply button,  the icon and name becomes currentUser's
  res.render('api/posts/reply-copy', {
    comment: newComment,
    layout: false
  })
}

module.exports = [
  MulterParser.none(),
  authenticateCurrentUserByToken('html'),
  getPostById('modal'),
  validation,
  checkValidation,
  addComments
]
