const router = require('express').Router()
const User = require("../models/User");
const CryptoJS = require('crypto-js')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
//UPDATE
router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
//DELETE
router.delete('/delete/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
})
//GET
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
})
module.exports = router