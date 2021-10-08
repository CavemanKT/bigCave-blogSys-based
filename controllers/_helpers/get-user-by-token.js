const moment = require('moment')

const { AuthenticityToken } = require("../../models")

module.exports = async function (req, res, next) {
  const { session: { token } } = req
  console.log(token);
  if (token) {
    const authToken = await AuthenticityToken.findOne({
      where: { token },
      include: AuthenticityToken.User
    })

    console.log(authToken);
    if (authToken) {
      const currentDate = moment()
      const expireDate = moment(authToken.createdAt).add(7, 'days')
      if (!currentDate.isAfter(expireDate)) {
        res.locals.currentUser = authToken.User
      }
    }
  }

  if (res.locals.currentUser === undefined) {
    res.locals.currentUser = null
  }

  next()
}
