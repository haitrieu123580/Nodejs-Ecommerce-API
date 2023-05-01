const asyncHandler = require("express-async-handler");
// VALIDATION

const validateCreateProductRequest = asyncHandler(async (req, res, next) => {
    product = {
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        price: req.body.price
    }
    if(parseInt(product.price)<=0){
        return res.status(400).json('price must be greater than 0!')
    }
    else {
        next()
    }
  });
module.exports = validateCreateProductRequest