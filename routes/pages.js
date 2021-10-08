const { Router } = require('express')
const router = Router()

router.get('/', require('../controllers/pages/all-posts/get-home'))
// browse all the posts in home page

module.exports = router
