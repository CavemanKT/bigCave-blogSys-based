const { authenticateCurrentUserByToken } = require('../../_helpers')
const { Post } = require('../../../models')  // models
const { User } = require('../../../models')  // models

const myPosts = async function(req, res) {
  const { locals: { currentUser } } = res
  const { query } = req
  // console.log(query); // use url to parse the data
  const limit = Number(query.limit) || 5
  // console.log(query.limit);

  // console.log(currentUser);
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
  let fullname = `${resultOfOneUser.firstName} ${resultOfOneUser.lastName}`
// fetch my own posts data from db regarding to the currentUser

  res.render('pages/my-posts/my-posts', {
    posts: results.rows,
    FullName: fullname
  })
}

module.exports = [authenticateCurrentUserByToken('html'), myPosts]
