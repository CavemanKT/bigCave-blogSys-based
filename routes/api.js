const { Router } = require('express')
const router = Router()



router.get('/my-posts', require('../controllers/pages/my-posts/get-my-posts'))


// router.get('/my-posts/one/:id', require('../controllers/api/api-my-posts/get-one-post'))
// //show snippet                GET

// router.get('/my-posts/new', require('../controllers/api/api-my-posts/get-new-form'))
// // get a new form               GET

// router.get('/my-posts/:id', require('../controllers/api/api-my-posts/edit-one-post'))
// // get the edit form to update   GET

// router.post('/my-posts/:id', require('../controllers/api/api-my-posts/create-one-post'))
// // Create                      POST

// router.delete('/my-posts/:id', require('../controllers/api/api-my-posts/delete-one-post'))
// //  DESTROY                 DELETE

// router.put('/my-posts/:id', require('../controllers/api/api-my-posts/update-one-post'))
// // update one post            PUT


module.exports = router
