const { Router } = require('express')
const router = Router()

// AUTH
router.post('/auth/signup', require('../controllers/api/auth/signup'))
router.post('/auth/login', require('../controllers/api/auth/login'))
router.delete('/auth/logout', require('../controllers/api/auth/logout'))

//Home Page ==============================================================
// SHOW in main page              GET
router.get('/posts/show/:id', require('../controllers/api/api-posts/get-one-post'))
// COMMENT from main page        POST
router.post('/posts/:id/reply', require('../controllers/api/api-posts/addComments'))


// My Page =============================================================
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

// DESTROY                      DELETE
router.delete('/my-posts/:id', require('../controllers/api/api-my-posts/delete-one-post'))

// router.put('/my-posts/:id', require('../controllers/api/api-my-posts/update-one-post'))
// // update one post            PUT

// router.get('/my-posts/:id/edit', require('../controllers/api/api-my-posts/edit-one-post'))
// // get the edit form to update   GET


// My Profile =================================================================
router.get('/my/profile', require('../controllers/api/my-profile/edit'))
router.put('/my/profile', require('../controllers/api/my-profile/update'))




module.exports = router
