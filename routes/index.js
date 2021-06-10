const { Router } = require('express')
const router = Router()

router.use('/', require('./pages'))

module.exports = router