const apiAuthLogout = async function(req, res) {
  req.session.token = ''
  res.status(204).json()
}

module.exports = [apiAuthLogout]
