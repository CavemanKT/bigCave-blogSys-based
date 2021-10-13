const { Router } = require('express')
const router = Router()


// infinite scroll in home page
router.post('/offset/:offsetNum', require('../controllers/pages/all-posts/offset-setting'))

// browse all the posts in home page
router.get('/', require('../controllers/pages/all-posts/get-home'))

module.exports = router
