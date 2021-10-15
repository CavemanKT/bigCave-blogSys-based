const { Router } = require('express')
const router = Router()

// browse all the posts in home page
router.get('/', require('../controllers/pages/all-posts/get-home'))

module.exports = router
