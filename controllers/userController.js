const router = require('express').Router()
const User = require("../models/User");
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');

//UPDATE
const updateUser = asyncHandler(async (req, res) => {
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
})
//DELETE
const deleteUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId)
    return res.status(200).json("User has been deleted...");
  } catch (error) {
    return res.status(500).json(error)
  }
})
//GET
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
})
module.exports = {
  updateUser,
  deleteUser,
  getUser
}