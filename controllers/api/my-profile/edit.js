const { authenticateCurrentUserByToken } = require('../../_helpers')

const apiMyProfileEdit = async function(req, res) {
  res.render('api/my-profile/edit', { layout: false })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  apiMyProfileEdit
]
