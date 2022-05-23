/* libraries */
const help = require("../help")
const express = require("express");
const ejs = require('ejs');
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const stripe = require('stripe')('sk_test_51L0LzJFUoS9VoaHuddHy3X76sZD0HlNXfA1vLlbSApcTpfVDiVwyrvZxQ5NjqxgWwA8AQlTHVu0Gmp3fxOprEoUS00zDRG81lN'); // Add your Secret Key Here


const { append } = require("express/lib/response");


/* express */
const app = express();
app.use(express.json())


//for payment 
app.engine('html', require('ejs').renderFile);
// app.use(express.static(path.join(__dirname, './views')));

router.get("/checkout_1", help.buyerAuthorized, async (req, res) => {
    let buyer_id = req.session.buyer.buyer_id
    let cartQuantity = await mysqlDB.getCartItemsLength(buyer_id)
    let cartItems = await mysqlDB.getCartItemsByBuyer(buyer_id)
    let subtotal = 0
    for (let cartItem of cartItems) {
        subtotal = subtotal + (parseInt(cartItem.product_quantity) * parseInt(cartItem.product_price))
    }
    res.render("checkout/checkout_1", { buyer_id, cartItems, cartQuantity, subtotal })
})


router.get("/checkout_confirmation", help.buyerAuthorized, async (req, res) => {
    let buyer_id = req.session.buyer.buyer_id
    // let cartQuantity = await mysqlDB.getCartItemsLength(buyer_id)
    res.render("checkout/checkout_confirmation")
})




router.post("/checkout_confirmation", help.buyerAuthorized, async (req, res) => {
    let buyer_id = req.session.buyer.buyer_id
    let cartItems = await mysqlDB.getCartItemsByBuyer(buyer_id)
    let deliveryAddress = req.body.deliveryAddress
    let postalCode = req.body.postalCode
    let province = req.body.province
    let city = req.body.city
    let paymentMethod = req.body.paymentMethod

    await mysqlDB.completeCartAfterOrder(buyer_id)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASS
        }
    });
    let day = 10
    var mailOptions = {
        from: process.env.MY_EMAIL,
        to: 'yoyochen68@yahoo.ca',
        subject: 'Order Confirmation',
        html: '<div style="border: 2px solid bisque; background-color: bisque; text-align: center;" ><h1>Thank you for supporting local business</h1><p>Your order will be delivery in' + day + 'days</p></div>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    console.log("total", req.body)

    //==for payment
    try {
        stripe.customers
            .create({
                name: req.body.name,
                email: req.body.email,
                source: req.body.stripeToken,

            })
            .then(customer =>
                stripe.charges.create({
                    amount: req.body.totalAmount * 100,
                    currency: "CAD",
                    country: "CA",
                    customer: customer.id
                    //add item info
                })
            )
            .then(() => res.render("checkout_confirmation.ejs"))
            .catch(err => console.log(err));
    } catch (err) {
        res.send(err);
    }






    res.redirect("/checkout/checkout_confirmation")
})




module.exports = router;