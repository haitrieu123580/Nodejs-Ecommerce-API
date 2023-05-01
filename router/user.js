const router = require('express').Router()
const verify = require("../middleware/verifyToken");
const userController = require('../controllers/userController')

//UPDATE
router.put('/:userId', verify.verifyTokenAndAuthorization, userController.updateUser)

//DELETE
router.delete('/:userId', verify.verifyTokenAndAuthorization, userController.deleteUser)

//GET
router.get('/find/:userId', verify.verifyTokenAndAdmin, userController.getUser)
module.exports = router