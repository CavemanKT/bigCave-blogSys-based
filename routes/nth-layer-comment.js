const { Router } = require('express')
const router = Router()

router.post('/2nd-layer-comment/:id', require('../controllers/api/nth-layer-comment/2nd-layer-comment')) //the error is from the controller, you haven't write any code in the reply controller



module.exports = router
