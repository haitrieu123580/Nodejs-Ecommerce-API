const Product = require("../models/Product");
const asyncHandler = require('express-async-handler')

// CREATE
const createProduct = asyncHandler(async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

//DELETE
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId)
        res.status(200).json("Product has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET
const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET ALL PRODUCTS
const getAllProducts = asyncHandler(async (req, res) =>{
    try {
        const products = await Product.find()
        return res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts
}