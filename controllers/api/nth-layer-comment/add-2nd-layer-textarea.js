const { body, check } = require('express-validator')
const MulterParser = require('../../../services/MulterParser')

const {
  authenticateCurrentUserByToken,
  checkValidation,
  myPost:{ getCurrentUserPostById },
} = require('../../_helpers')

const { Post, Comment, User } = require('../../../models')

const permittedParams = [
  'content',
  'UserId',
  'PostId',
  'ParentId'
]

const validation = [
  check('content')
    .isString({min: 10}).withMessage('Comment must be a String')
    .notEmpty().withMessage('Comment is Required'),
]

const addTextArea = async function(req, res) {

  const { locals: { currentPost, currentUser } } = res

  // const newComment = await Comment.create({
  //   UserId: currentUser.id,
  //   PostId: currentPost.id,
  //   ...commentParam,
  // }, {
  //   fields: permittedParams,
  //   include: {
  //     association: Post.Comments,
  //     include: {
  //       association: User.Comments
  //     }
  //   }
  // })

  res.render('api/my-posts/reply', {
    currentUser,
    comment: newComment,
    layout: false
  })
}

module.exports = [
  MulterParser.none(),
  authenticateCurrentUserByToken('html'),
  // getCurrentUserPostById('modal'),
  validation,
  checkValidation,
  addTextArea
]
