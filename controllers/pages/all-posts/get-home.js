const { Post, User } = require('../../../models')  // models

const permittedChangeParams = {
  offset: ['offset']
}
const homePage = async function(req, res) {
// fetch all the posts data from db regardless of the currentUser
  // find data
  const { locals: { currentUser } } = res

  if( currentUser ) {
    await currentUser.update( {offset: null }, { fields: permittedChangeParams.offset })
  }

  const limit = 5
  const results = await Post.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
  })

  res.render('pages/all-posts/home', {posts: results.rows })
}

module.exports = [homePage]
