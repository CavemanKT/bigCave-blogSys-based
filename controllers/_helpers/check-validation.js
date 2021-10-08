const { validationResult } = require('express-validator')

module.exports = async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(406).json(errors)

  next()
}
