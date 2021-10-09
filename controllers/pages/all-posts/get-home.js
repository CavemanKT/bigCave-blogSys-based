const { Post } = require('../../../models')  // models

const homePage = async function(req, res) {
// fetch all the posts data from db regardless of the currentUser
  // find data
  const limit = 15
  const results = await Post.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
  })

  res.render('pages/all-posts/home', {posts: results.rows })
}

module.exports = [homePage]
