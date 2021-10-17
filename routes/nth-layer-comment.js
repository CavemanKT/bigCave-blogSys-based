const { Router } = require('express')
const router = Router()


// when you need to submit 1st-layer-comment
router.post('/1st-layer-comment/addComment/:id', require('../controllers/api/nth-layer-comment/1st-layer-comment'))

// When you need textarea
router.post('/1st-layer-comment/textarea/:id', require('../controllers/api/nth-layer-comment/add-1st-layer-textarea')) //the error is from the controller, you haven't write any code in the reply controller



module.exports = router
