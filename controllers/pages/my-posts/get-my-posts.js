const myPosts = function(req, res) {
// fetch my own posts data from db regarding to the currentUser

  res.render('pages/my-posts/my-posts', {posts: postsParams})
}

module.exports = [myPosts]
