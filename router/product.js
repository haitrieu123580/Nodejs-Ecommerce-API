const router = require('express').Router()
const Product = require('../models/Product')
const CryptoJS = require('crypto-js')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
// CREATE
router.post("/create", verifyToken, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
})

//UPDATE
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});
//DELETE
router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
})
//GET
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
})
//GET ALL PRODUCTS
router.get('/', async (req, res) => {

})
module.exports = router