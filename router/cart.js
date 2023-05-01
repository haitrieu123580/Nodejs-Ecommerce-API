const router = require('express').Router()
const cartController = require('../controllers/cartController')
const verify = require('../middleware/verifyToken')

//CREATE
router.post('/create', verify.verifyToken, cartController.createCart)

//UPDATE
router.put('/update/:cartId', verify.verifyTokenAndAdmin, cartController.updateCart)

//DELETE
router.delete("/:cartid", verify.verifyTokenAndAdmin, cartController.deleteCart);

//GET USER CART
router.get("/find/:userId", verify.verifyTokenAndAuthorization, cartController.getCartsByUserId);

//GET ALL CARTS
router.get('/find', verify.verifyTokenAndAdmin, cartController.getAllCarts)
module.exports = router