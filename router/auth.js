const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require("jsonwebtoken");
// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString(),
        isAdmin: req.body.isAdmin
    });
    try {
        // save user to db  
        const savedUser = await newUser.save()
        console.log('created new user');
        res.status(201).json({ newUser: savedUser })
    } catch (error) {
        res.status(500).json(error)
    }

})
//LOGIN

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        originalPassword != inputPassword &&
            res.status(401).json("Wrong Password");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });

    } catch (err) {
        res.status(500).json(err);
    }

});
module.exports = router