const { body } = require('express-validator')
const MulterParser = require('../../../services/MulterParser')

const { authenticateCurrentUserByToken, checkValidation } = require('../../_helpers')

const { Post } = require('../../../models')  // models

const permittedParams = [
  'title',
  'content'
]

const validation = [
  body('title').isString().withMessage('Title must be a String or Number').notEmpty().withMessage('Title is Required'),
  body('content').isString().withMessage('Content must be a String or Number').notEmpty().withMessage('Content is Required'),
]

const createMyPosts = async function(req, res) {
// fetch all the posts data from db regardless of the currentUser
// create data
  const { locals: { currentUser } } = res
  const { body: postParams } = req
  console.log('postParams: ', postParams);
  const newPost = await Post.create({
    ...postParams,
  }, {
    fields: permittedParams,
    include: {
      association: Post.Comments
    }
  })
  newPost = setUser(currentUser)

  // find data
  const limit = 6
  const results = await Post.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
  })

  res.render('pages/all-posts/home', {
    posts: results.rows,
    newPost: newPost
  })
}

module.exports = [
  MulterParser.none(),
  authenticateCurrentUserByToken('html'),
  validation,
  checkValidation,
  createMyPosts
]
