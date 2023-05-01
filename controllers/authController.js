const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


// REGISTER
const register = async (req, res) => {
    // exist user
    const user = await User.findOne({ username: req.body.username })
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    else {
        const { username, password, email, isAdmin } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword, isAdmin });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
//LOGIN
const login = async (req, res) => {
    const {username, password}  = req.body
    //find username
    const user = await User.findOne({ username: username })
    if (user) {
        //compare password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        else {
            //create sign
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
        }
    }
    else {
        return res.json({ message: 'user not exist' })
    }
}
module.exports = {
    register,
    login
}