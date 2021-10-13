const { authenticateCurrentUserByToken } = require('../../_helpers')
const { Post } = require('../../../models')
const { User } = require('../../../models')

const myPosts = async function(req, res) {
  const { locals: { currentUser } } = res
  const { query } = req
  const limit = Number(query.limit) || 5

  let fullname = ''

  const results = await Post.findAndCountAll({
    where: {
      UserId: currentUser.id
    },
    order: [['createdAt', 'DESC']],
    limit,
  })

  const resultOfOneUser = await User.findOne({
    where: {
      id: currentUser.id
    }
  })
  console.log(resultOfOneUser.firstName);

  if (resultOfOneUser.firstName == null && resultOfOneUser.lastName == null) {
    fullname = false
  } else {
    fullname = `${resultOfOneUser.firstName} ${resultOfOneUser.lastName}`
  }

  res.render('pages/my-posts/my-posts', {
    posts: results.rows,
    FullName: fullname
  })
}

module.exports = [authenticateCurrentUserByToken('html'), myPosts]
