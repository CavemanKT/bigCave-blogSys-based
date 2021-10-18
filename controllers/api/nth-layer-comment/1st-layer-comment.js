// it triggers when we click the comment reply btn
const { body, check } = require('express-validator')
const MulterParser = require('../../../services/MulterParser')

const {
  authenticateCurrentUserByToken,
  checkValidation,
  myComment: {getCurrentUserCommentById},
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

const addComments = async function(req, res) {

  const { locals: { currentUser } } = res
  const { body: {content}, params: { id } } = req

  const previousComment = await Comment.findOne({
    where: {
      id: id
    },
  })
  // console.log( 'previousComment.content: ', previousComment.content);


  const user = await User.findOne({
    where: {
      id: previousComment.UserId
    }
  })

  // console.log(user.firstName, user.lastName);

  const thePost = await Post.findOne({
    where: {
      id: previousComment.PostId
    }
  })
  // console.log('the Post', thePost);

  const newComment = await Comment.create({
    UserId: currentUser.id,
    PostId: previousComment.PostId,
    ParentId: id,
    content,
  }, {
    fields: permittedParams,
    include: {
      association: Post.Comments,
      include: {
        association: User.Comments
      }
    }
  })
  // console.log('newComment: ', newComment);



  res.render('api/nth-layer-comment/1st-layer-comment', {
    user,
    previousComment,
    id: newComment.id,
    ParentId: id,
    currentUser,
    content: newComment.content,
    layout: false
  })
}

module.exports = [
  MulterParser.none(),
  authenticateCurrentUserByToken('html'),
  validation,
  checkValidation,
  addComments
]