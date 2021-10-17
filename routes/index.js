const { Router } = require('express')
const router = Router()

const { getUserByToken } = require('../controllers/_helpers')

router.use('/', getUserByToken, require('./pages')) // home page
router.use('/api', getUserByToken, require('./api'))
router.use('/nth-layer-comment', getUserByToken, require('./nth-layer-comment')) // 3rd-layer-comment

module.exports = router
