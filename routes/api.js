const { Router } = require('express')
const router = Router()



router.get('/my-posts', require('../controllers/pages/my-posts/get-my-posts'))
router.get('/my-posts/one/:id', require('../controllers/api-my-posts/get-one-post'))    //show snippet GET
router.get('/my-posts/edit', require('../controllers/api-my-posts/get-new-form'))
router.get('/my-posts/:id', require('../controllers/api-my-posts/edit-one-post'))    //
router.post('/my-posts/:id', require('../controllers/api-my-posts/create-one-post'))   // Create     POST
router.delete('/my-posts/:id', require('../controllers/api-my-posts/delete-one-post'))    //  DESTROY     DELETE
router.put('/my-posts/:id', require('../controllers/api-my-posts/update-one-post'))


module.exports = router
