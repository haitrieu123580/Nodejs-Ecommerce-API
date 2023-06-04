require('dotenv').config()
const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)

router.post('/payment', (req, res) =>{

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,

    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: 2500,     // Charging Rs 25
            description: 'Product',
            currency: 'USD',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success")  // If no error occurs
    })
    .catch((err) => {
        res.send(err)       // If some error occurs
    });
})
module.exports = router