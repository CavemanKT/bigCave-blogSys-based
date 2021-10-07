const homePage = function(req, res) {
// fetch all the posts data from db regardless of the currentUser

  res.render('pages/all-posts/home', {posts: postsParams})
}

module.exports = [homePage]
