const { authenticateCurrentUserByToken } = require('../../_helpers')



const compose = async function(req, res) {

  res.render('api/my-posts/compose', { layout: false })
}

module.exports = [authenticateCurrentUserByToken('json'), compose]
