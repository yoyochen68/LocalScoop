/* libraries */
const express = require("express");
const ejs = require('ejs');
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')



const { append } = require("express/lib/response");


/* express */
const app = express();
app.use(express.json())


router.get("/checkout", async(req, res) => {
    let buyer_Id = 1
    let cartIterms = await mysqlDB.getCartItemsByBuyer(buyer_Id)
    let cartQuantity = await mysqlDB.getCartItemsLength(buyer_Id)
    res.render("checkout/checkout",{buyer_Id,cartIterms,cartQuantity})
})





router.get("/checkout_confirmation", (req, res) => {
    res.render("checkout/checkout_confirmation")
})

router.post("/checkout_confirmation", (req, res) => {
let deliveryAddress=req.body.deliveryAddress
let postalCode=req.body.postalCode
let province=req.body.province
let city=req.body.city
let paymentMethod=req.body.paymentMethod


    res.redirect("/checkout/checkout_confirmation")
})




module.exports = router;