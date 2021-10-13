const { body, check } = require('express-validator')
const MulterParser = require('../../../services/MulterParser')

const {
  checkValidation,
  authenticateCurrentUserByToken ,
} = require('../../_helpers')

const permittedChangeParams = ['firstName', 'lastName', 'avatar']

const validation = [
  body('firstName')
    .isString().withMessage('First Name must be a String')
    .notEmpty().withMessage('First Name is Required'),
  body('lastName')
    .isString().withMessage('Last Name must be a String')
    .notEmpty().withMessage('Last Name is Required')
]

const apiMyProfileUpdate = async function(req, res) {
  const { locals: { currentUser } } = res

  const newInfo = { ...req.body }
  if (req.file && req.file.location) {
    newInfo.avatar = req.file.location
  }
  console.log(currentUser, newInfo);

  console.log(await currentUser.update(newInfo, { fields: permittedChangeParams }))

  res.status(204).json()

}

module.exports = [
  MulterParser.single('avatar'),
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  apiMyProfileUpdate
]
