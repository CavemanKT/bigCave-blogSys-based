const { Router } = require('express')
const router = Router()

// AUTH
router.post('/auth/signup', require('../controllers/api/auth/signup'))
router.post('/auth/login', require('../controllers/api/auth/login'))
router.delete('/auth/logout', require('../controllers/api/auth/logout'))

//Home Page ==============================================================
// infinite scroll in home page
router.get('/posts', require('../controllers/api/api-posts/offset-setting'))
// SHOW in main page              GET`
router.get('/posts/show/:id', require('../controllers/api/api-posts/get-one-post'))
// COMMENT from main page        POST
router.post('/posts/:id/reply', require('../controllers/api/api-posts/addComments'))

// My Page =============================================================
//infinity scrolling
router.get('/offset', require('../controllers/api/api-my-posts/offset-setting'))

//browse only my posts           GET
router.get('/my-posts', require('../controllers/pages/my-posts/get-my-posts'))

// Create                        POST
router.post('/my-posts', require('../controllers/api/api-my-posts/create-one-post'))

// Snippet                        GET
router.get('/my-posts/new', require('../controllers/api/api-my-posts/get-new-form'))

// SHOW in my page                GET
router.get('/my-posts/show/:id', require('../controllers/api/api-my-posts/get-one-post'))

// COMMENT                        POST
router.post('/my-posts/:id/reply', require('../controllers/api/api-my-posts/addComments'))

// get edit form                  GET
router.get('/my-posts/edit/:id', require('../controllers/api/api-my-posts/edit-one-post'))

// DESTROY                      DELETE
router.delete('/my-posts/:id', require('../controllers/api/api-my-posts/delete-one-post'))

// UPDATE THE EDIT FORM            PUT
router.put('/my-posts/:id', require('../controllers/api/api-my-posts/update-one-post'))

// My Profile =================================================================
router.get('/my/profile', require('../controllers/api/my-profile/edit'))
router.put('/my/profile', require('../controllers/api/my-profile/update'))




module.exports = router
