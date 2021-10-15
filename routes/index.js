const { Router } = require('express')
const router = Router()

const { getUserByToken } = require('../controllers/_helpers')

router.use('/', getUserByToken, require('./pages')) // home page
router.use('/api', getUserByToken, require('./api'))

module.exports = router
