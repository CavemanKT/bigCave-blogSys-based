const { Post } = require('../../../models')  // models

const homePage = async function(req, res) {
  // fetch all the posts data from db regardless of the currentUser
  // find data

  const limit = 5
  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
    limit,
  })

  res.render('pages/all-posts/home', { posts })
}

module.exports = [homePage]
