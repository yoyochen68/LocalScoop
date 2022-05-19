/* libraries */
const express = require("express");
const ejs = require('ejs');
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')



const { append } = require("express/lib/response");


/* express */
const app = express();
app.use(express.json())


router.get("/checkout_1", async (req, res) => {
    let buyer_id = req.session.buyer.buyer_id
    let cartIterms = await mysqlDB.getCartItemsByBuyer(buyer_id)
    let cartQuantity = await mysqlDB.getCartItemsLength(buyer_id)
    res.render("checkout/checkout_1", { buyer_id, cartIterms, cartQuantity })
})


router.get("/checkout_confirmation", async (req, res) => {
    let buyer_id = req.session.buyer.buyer_id
    let cartQuantity = await mysqlDB.getCartItemsLength(buyer_id)

    res.render("checkout/checkout_confirmation",{cartQuantity})
})

router.post("/checkout_confirmation", (req, res) => {
    let buyer_id = req.session.buyer.buyer_id
    let deliveryAddress = req.body.deliveryAddress
    let postalCode = req.body.postalCode
    let province = req.body.province
    let city = req.body.city
    let paymentMethod = req.body.paymentMethod

    res.redirect("/checkout/checkout_confirmation")
})




module.exports = router;