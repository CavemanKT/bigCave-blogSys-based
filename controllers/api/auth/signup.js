const bcrypt = require("bcrypt")
const { body } = require('express-validator')
const MulterParser = require('../../../services/MulterParser')

const { User } = require('../../../models')
const { checkValidation } = require('../../_helpers')

const permittedSignupParams = ['email', 'passwordHash']

const validation = [
  body('email')
    .notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Email must be valid')
    .custom(async function(email) {
      if (email) {
        const user = await User.findOne({ where: { email } })
        if (user) return Promise.reject()
      }
    }).withMessage('Email already in use'),
  body('password')
    .notEmpty().withMessage('Password is Required')
    .isLength({ min: 6 }).withMessage('Password must be longer or equal to 6 characters')
]

const userSerializer = function(values) {
  const { ...user } = values.dataValues
  delete user.passwordHash
  return user
}

const apiAuthSignup = async function(req, res) {
  const { body: userParams } = req

  // Build a new user
  const user = await User.build(userParams, { attributes: permittedSignupParams })
  // Set the passwordHash with the hashed password with 10 rounds of salting
  user.passwordHash = await bcrypt.hash(userParams.password, 10)
  // Saves the user
  await user.save()

  // Prevents the passwordHash from being sent!
  res.status(200).json(userSerializer(user))
}

module.exports = [
  MulterParser.none(),
  validation,
  checkValidation,
  apiAuthSignup
]
