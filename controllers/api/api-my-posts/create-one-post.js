const { body } = require('express-validator')
// const MulterParser = require('../../../services/MulterParser')

const { authenticateCurrentUserByToken, checkValidation } = require('../../_helpers')

const { Post } = require('../../../models')  // models

const permittedParams = [
  'title',
  'content'
]

const validation = [
  body('title').isString().isNumber().withMessage('Title must be a String or Number').notEmpty().withMessage('Title is Required'),
  body('content').isString().isNumber().withMessage('Content must be a String or Number').notEmpty().withMessage('Content is Required'),
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
    layout: false, })
}

module.exports = [
  // MulterParser.none(),
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  createMyPosts
]
