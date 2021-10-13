const { Post } = require('../../../models')  // models

const offsetSetting = async function(req, res) {
  const { params: {offsetNum} } = req
  const limit = 5
  console.log('offsetNum: ', offsetNum);
  const results = await Post.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset: offsetNum
  })

  res.render('pages/all-posts/home', {posts: results.rows })
}

module.exports = [offsetSetting]
