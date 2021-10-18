const { body, check } = require('express-validator')
const MulterParser = require('../../../services/MulterParser')

const {
  authenticateCurrentUserByToken,
  checkValidation,
  myComment: { getCurrentUserCommentById }
} = require('../../_helpers')

const { Post, Comment, User } = require('../../../models')


const validation = [
  check('content')
    .isString({min: 10}).withMessage('Comment must be a String')
    .notEmpty().withMessage('Comment is Required'),
]

const addTextArea = async function(req, res) {

  // const { locals: { currentComment } } = res
  const { params: {id} } = req

  const previousComment = await Comment.findOne({
    where: {
      id: id
    }
  })
  console.log('previous comment: ', id);

  const user = await User.findOne({
    where: {
      id: previousComment.UserId
    }
  })

  res.render('api/nth-layer-comment/1st-layer-textarea', {
    previousCommentUser: user,
    previousComment,
    ParentId: id,
    layout: false
  })
}

module.exports = [
  MulterParser.none(),
  authenticateCurrentUserByToken('html'),
  // getCurrentUserCommentById('modal'),
  checkValidation,
  addTextArea
]
