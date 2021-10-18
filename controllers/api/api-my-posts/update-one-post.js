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

  const { query } = req
  const limit = Number(query.limit) || 5

  let fullname = ''

  if( currentUser ) {
    await currentUser.update( {offset: null }, { fields: permittedChangeParams.offset })
  }

  const results = await Post.findAndCountAll({
    where: {
      UserId: currentUser.id
    },
    order: [['createdAt', 'DESC']],
    limit,
  })

  if (currentUser.firstName == null && currentUser.lastName == null) {
    fullname = false
  } else {
    fullname = `${currentUser.firstName} ${currentUser.lastName}`
  }

  res.render('pages/my-posts/my-posts', {
    posts: results.rows,
    FullName: fullname
  })
}

module.exports = [
  MulterParser.none(),
  authenticateCurrentUserByToken('json'),
  getCurrentUserPostById('modal', {
    order: [['Comments', 'createdAt', 'DESC']],
    include: [
      {
        association: Post.Comments,
      }, {
        association: Post.User
      }
    ]
  }),
  validation,
  checkValidation,
  myPostUpdate
]
