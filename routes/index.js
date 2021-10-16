const { Router } = require('express')
const router = Router()

const { getUserByToken } = require('../controllers/_helpers')

router.use('/', getUserByToken, require('./pages')) // home page
router.use('/api', getUserByToken, require('./api'))
router.use('/reply', getUserByToken, require('./reply')) // 3rd-layer-comment

module.exports = router
