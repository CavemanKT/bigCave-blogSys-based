const { Router } = require('express')
const router = Router()

router.post('/3-layer-comment/:id', require('../controllers/api/reply/3rd-layer-comment')) //the error is from the controller, you haven't write any code in the reply controller



module.exports = router
