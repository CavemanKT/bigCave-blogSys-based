const { Router } = require('express')
const router = Router()

router.get('/', require('../controllers/pages/all-posts/get-home'))


module.exports = router
