const { Router } = require('express')
const router = Router()

router.get('/', require('../controllers/pages/static/get-home'))

module.exports = router