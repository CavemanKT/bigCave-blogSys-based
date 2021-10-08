const { Router } = require('express')
const router = Router()

// AUTH
router.post('/auth/signup', require('../controllers/api/auth/signup'))
router.post('/auth/login', require('../controllers/api/auth/login'))
router.delete('/auth/logout', require('../controllers/api/auth/logout'))


router.get('/my-posts', require('../controllers/pages/my-posts/get-my-posts'))
//browse only my posts

router.post('/my-posts', require('../controllers/api/api-my-posts/create-one-post'))
// Create                      POST

// router.get('/my-posts/show/:id', require('../controllers/api/api-my-posts/get-one-post'))
// //show                   GET

// router.delete('/my-posts/:id', require('../controllers/api/api-my-posts/delete-one-post'))
// //  DESTROY                 DELETE

// router.put('/my-posts/:id', require('../controllers/api/api-my-posts/update-one-post'))
// // update one post            PUT

// router.get('/my-posts/:id/edit', require('../controllers/api/api-my-posts/edit-one-post'))
// // get the edit form to update   GET


// My Profile
// router.get('/my/profile', require('../controllers/api/my-profile/edit'))
// router.put('/my/profile', require('../controllers/api/my-profile/update'))




module.exports = router
