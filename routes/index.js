const { Router } = require('express')
const router = Router()

router.use('/', require('./pages'))
router.use('/api', require('./api'))
// router.use('./auth', require('./auth'))
module.exports = router
