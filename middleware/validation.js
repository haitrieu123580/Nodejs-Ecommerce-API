const asyncHandler = require("express-async-handler");
// VALIDATION

const validateRegisterRequest = asyncHandler(async (req, res, next) => {
    user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (user.username.length <= 3 || user.password.length <= 3) {
        res.status(400).json({ message: 'username or password not valid' })
    }
    else if (!emailRegex.test(user.email)) {
        res.status(400).json({ message: 'email not valid' })
    }
    else {
        next()
    }
  });
module.exports = validateRegisterRequest