require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });


const authRouter = require('./router/auth')
const userouter = require('./router/user')
const orderRouter = require('./router/order')
const productRouter = require('./router/product')
const cartRouter = require('./router/cart')
const stripeRouter = require('./router/stripe')

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/stripe", stripeRouter)

const Publishable_Key  = "pk_test_51NEqDeJgPQtTWCswyKFU4nMkHlVvuSPyhXxOXbN6eemDsNpoFGARnwZ8XO98hcC8gMEOjDNe7HkRzIkQQLMKLan600lBZh8tu0"
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('home', { key: Publishable_Key });
  });
  

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); })