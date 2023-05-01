const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const authController = require('../controllers/authController')
const validation = require('../middleware/validation')

router.post('/register',validation, asyncHandler(authController.register))
//LOGIN
router.post('/login', asyncHandler(authController.login))
module.exports = router