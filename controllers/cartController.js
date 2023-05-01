const Cart = require("../models/Cart");
const asyncHandler = require('express-async-handler')

//CREATE
const createCart = asyncHandler(async (req, res) => {
    const newCart = new Cart({
        userId: req.user.id,
        products: req.body.products
    });
    try {
        const saveCart = await newCart.save()
        res.status(200).json({ newCart: saveCart })
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
const updateCart = asyncHandler(async (req, res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.cartId,
            {
                $set: req.body
            },
            { new: true }
        )
        // console.log(updateCart);
        res.status(200).json({ updateCart })
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
const deleteCart = asyncHandler(async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.cartid);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET USER CART
const getCartsByUserId = asyncHandler(async (req, res) => {
    try {
        const carts = await Cart.find({ userId: req.params.userId });
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET ALL CARTS
const getAllCarts = asyncHandler(async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getAllCarts,
    getCartsByUserId
}