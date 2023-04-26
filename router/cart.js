const router = require('express').Router()
const Cart = require('../models/Cart')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE
router.post('/create', verifyToken, async (req, res) => {
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
router.put('/update/:cartId', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateCart = Cart.findByIdAndUpdate(
      req.params.cartId,
      {
        $set: req.body
      },
      { new: true }
    )
    res.status(200).json({ updateCart })
  } catch (error) {
    res.status(500).json(error)
  }
})
//DELETE
router.delete("/:cartid", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartid);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.params.userId });
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL CARTS
router.get('/find', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router