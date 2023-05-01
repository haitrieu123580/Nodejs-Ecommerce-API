const router = require('express').Router()
const orderController = require('../controllers/orderController')
const verify = require('../middleware/verifyToken')

//CREATE
router.post('/create', verify.verifyToken, orderController.createOrder)

//UPDATE
router.put("/update/:orderId", verify.verifyTokenAndAdmin, orderController.updateOrder);

//DELETE
router.delete("/:orderId", verify.verifyTokenAndAdmin, orderController.deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verify.verifyTokenAndAuthorization, orderController.getOrdersByUserId);

//GET ALL
router.get("/find", verify.verifyTokenAndAdmin, orderController.getAllOrders);

module.exports = router