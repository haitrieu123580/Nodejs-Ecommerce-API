const router = require('express').Router()
const verify = require("../middleware/verifyToken");
const productController = require('../controllers/productController')
const validateCreateProductRequest = require('../middleware/validateProduct')

// CREATE
router.post('/create', verify.verifyTokenAndAdmin, validateCreateProductRequest, productController.createProduct)

//UPDATE
router.put('/update/:productId', verify.verifyTokenAndAdmin, productController.updateProduct)

//DELETE
router.delete('/delete/:productId', verify.verifyTokenAndAdmin, productController.deleteProduct)

//GET
router.get('/find/:productId', productController.getProductById)

//GET ALL PRODUCTS
router.get('/', productController.getAllProducts)

module.exports = router