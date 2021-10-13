const { body, check } = require('express-validator')
const MulterParser = require('../../../services/MulterParser')

const {
  authenticateCurrentUserByToken,
  checkValidation,
  post: { getPostById }
} = require('../../_helpers')

const { Post } = require('../../../models')
const { Comment } = require('../../../models')

const permittedParams = [
  'content'
]

const validation = [
  check('content')
    .isString({min: 10}).withMessage('Comment must be a String')
    .notEmpty().withMessage('Comment is Required'),
]

const addComments = async function(req, res) {
// fetch all the posts data from db regardless of the currentUser
// create data

  const { locals: { currentPost } } = res
  const { locals: { currentUser } } = res
  const { body: commentParam } = req

  const newComment = await Comment.create({
    ...commentParam,
  }, {
    fields: permittedParams,
    include: {
      association: Post.Comments
    }
  })


  const results = await Comment.findAndCountAll({
    where: {
      PostId: currentPost.id
    },
    order: [['createdAt', 'DESC']],
  })

  newComment.setUser(currentUser)   // to set the UserId
  newComment.setPost(currentPost)

  results.rows.unshift(newComment)


  res.render('api/posts/show', {
    comments: results.rows,
    post: currentPost,
    user: currentUser,
    layout: false
  })
}

module.exports = [
  MulterParser.none(),
  authenticateCurrentUserByToken('html'),
  validation,
  checkValidation,
  getPostById('modal'),
  addComments
]
