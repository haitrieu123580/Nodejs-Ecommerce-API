const Order = require("../models/Order");
const asyncHandler = require('express-async-handler')

//CREATE
const createOrder = asyncHandler(async (req, res) => {
    const newOrder = new Order({
        userId: req.user.id,
        ...req.body
    });
    try {
        const saveOrder = await newOrder.save()
        res.status(200).json({ newOrder: saveOrder })
    } catch (error) {
        res.status(500).json(error)
    }
})
//UPDATE
const updateOrder = asyncHandler(async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.orderId,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

//DELETE
const deleteOrder = asyncHandler(async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.orderId);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET USER ORDERS
const getOrdersByUserId = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})


const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrdersByUserId,
}