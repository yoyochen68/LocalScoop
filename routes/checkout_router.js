/* libraries */
const help = require("../help")
const express = require("express");
const ejs = require('ejs');
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Add your Secret Key Here


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
    res.render("checkout/checkout_1", { err: null, buyer_id, cartItems, cartQuantity, subtotal })
})





router.get("/checkout_confirmation", help.buyerAuthorized, async (req, res) => {
    let buyer_id = req.session.buyer.buyer_id
    let cartQuantity = await mysqlDB.getCartItemsLength(buyer_id)
    res.render("checkout/checkout_confirmation", { cartQuantity })
})


router.post("/checkout_confirmation", help.buyerAuthorized, async (req, res) => {
    let buyer_id = req.session.buyer.buyer_id
    let cartItems = await mysqlDB.getCartItemsByBuyer(buyer_id)
    let cart_id = await mysqlDB.getCartIdByBuyerId(buyer_id)
    let cartQuantity = await mysqlDB.getCartItemsLength(buyer_id)

    let deliveryfee = req.body.delivery
    let deliveryAddress = req.body.deliveryAddress
    let postalCode = req.body.postalCode
    let province = req.body.province
    let city = req.body.city
    let totalAmount = req.body.totalAmount

    let fullAddress = `${deliveryAddress}, ${city}, ${province} ${postalCode}`

    let subtotal = 0
    for (let cartItem of cartItems) {
        subtotal = subtotal + (parseInt(cartItem.product_quantity) * parseInt(cartItem.product_price))
    }

    let deliveryDays = 0
    if (parseInt(deliveryfee) === 10) {
        deliveryDays = 10
    } else if (parseInt(deliveryfee) === 20) {
        deliveryDays = 5
    }

    //=========for email======
    function autoEmailSent(order_id) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASS
            }
        });

        var mailOptions = {
            from: process.env.MY_EMAIL,
            to: 'yoyochen68@yahoo.ca',
            subject: 'Order Confirmation',
            html: `<div style="background-color: rgba(238, 193, 149, 0.19); display: grid; place-items: center; text-align: center; ">
            <h1 style="color: #e3974f;">L<span style="color: #c3d99d;">O</span>CALSCOOP</h1>
            <h3>Thank You For Supporting Local Business</h3>
            
            <h4>Order Detail:</h4>
            <table>
                <tr>
                    <th style="padding-right: 60px;">Order Confirmation</th>
                    <th style="text-align: right">#` + order_id + `</th>
                </tr>
                <tr>
                    <td style="padding-right: 60px;">Purchased Iterm(` + cartQuantity + `)</td>
                    <td style="text-align: right">$`+ subtotal.toFixed(2) + `</td>
                </tr>
                <tr>
                    <td style="padding-right: 60px;">Shipping Fee</td>
                    <td style="text-align: right">$`+ parseInt(deliveryfee).toFixed(2) + `</td>
                </tr>
                <tr>
                    <td style="padding-right: 60px;">Sales Tax</td>
                    <td style="text-align: right">$`+ (subtotal * 0.12).toFixed(2) + `</td>
                </tr>
                <tr>
                    <th style="padding-right: 60px;">TOTAL</th>
                    <th style="text-align: right">$`+ parseInt(totalAmount).toFixed(2) + `</th>
                </tr>
            </table>
           
    <div>
        <h4>Delivery Address:</h4>` + fullAddress + `
    </div>
    <h4>Your order will be delivery in `+ deliveryDays + ` days</h4>
        </div>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }

    //==for payment==========

    const stripCartItems = {}
    for (const item in cartItems) {
        const newItem = {}
        newItem.cart_product_id = cartItems[item].cart_product_id
        newItem.buyer_id = cartItems[item].buyer_id
        newItem.cart_id = cartItems[item].cart_id
        newItem.product_id = cartItems[item].product_id
        newItem.product_name = cartItems[item].product_name
        newItem.product_price = cartItems[item].product_price
        newItem.product_quantity = cartItems[item].product_quantity
        newItem.purchased = cartItems[item].purchased
        stripCartItems[item] = JSON.stringify(newItem)
    }


    try {
        stripe.customers
            .create({
                name: req.body.name,
                email: req.body.email,
                source: req.body.stripeToken,

            })
            .then(customer =>
                stripe.charges.create({
                    amount: totalAmount * 100,
                    currency: "CAD",
                    // country: "CA",
                    customer: customer.id,
                    //add item info, 
                    metadata: {
                        ...stripCartItems,
                        customKey: ":)"
                    }
                })
            )
            // .then(() => res.render("checkout_confirmation.ejs"))
            .then((responses) => {

                let stripePaymentId = responses.id

                let order_id = mysqlDB.createOrderAfterPayment(cart_id, totalAmount, stripePaymentId, fullAddress, deliveryfee)
                console.log("ooooo", order_id)
                mysqlDB.completeCartAfterOrder(buyer_id)

                autoEmailSent(order_id)

                res.redirect("/checkout/checkout_confirmation")
            })
            .catch(err => {
                console.log(err)
                res.redirect("/checkout/checkout_1")
            })
    } catch (err) {

        res.send(err);
    }

})




module.exports = router;