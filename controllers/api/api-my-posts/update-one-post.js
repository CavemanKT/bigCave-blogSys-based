const { body } = require('express-validator')
const MulterParser = require('../../../services/MulterParser')

const { checkValidation, authenticateCurrentUserByToken , myPost: { getCurrentUserPostById } } = require('../../_helpers')

const { Post, Comment } = require('../../../models')

const permittedChangeParams = {
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

const myPostUpdate = async function(req, res) {
  const { locals: { currentUser, currentPost } } = res
  const {
    body: postParams,
    params: { id }
  } = req


  await currentPost.update(postParams, { fields: permittedChangeParams.Post })
  const results = await Comment.findAndCountAll({
    where: {
      PostId: currentPost.id
    },
    order: [['createdAt', 'DESC']],
    // limit,
  })

  res.render('api/my-posts/show', {
    comments: results.rows,
    post: currentPost,
    user: currentUser,
    layout: false
  })
}

module.exports = [
  MulterParser.none(),
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  getCurrentUserPostById('modal'),
  myPostUpdate
]
