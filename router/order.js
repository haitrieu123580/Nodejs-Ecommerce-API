const router = require('express').Router()
const Order = require('../models/Order')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE
router.post('/create', verifyToken, async (req, res) => {
  const newOrder = new Order({
    userId: req.user.id,
    ...req.body
  });
  // console.log(newCart)
  try {
    const saveOrder = await newOrder.save()
    res.status(200).json({ newOrder: saveOrder })
  } catch (error) {
    res.status(500).json(error)
  }
})
//UPDATE
router.put("/update/:orderId", verifyTokenAndAdmin, async (req, res) => {
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
});
//DELETE
router.delete("/:orderId", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/find", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router