const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const db = require("../fake-db");
const router = express.Router();


/* express */
const app = express();
app.use(express.json())

// GET orders/orders_1
router.get("/orders_1", (req, res) => {
    let updateTime = 'Yesterday'
    let productName = 'Nike Sage Lows'
    let productPrice = '$125'

    let carouselSliderData = [
        { updateTime : 'Yesterday', productName : 'Nike Sage Lows', productPrice : '$125' },
        { updateTime : '2 Days Ago', productName : 'White Luxury Hoodie', productPrice : '$105' },
        { updateTime : '3 Days Ago', productName : 'Nike Air Force One-Blue', productPrice : '$175' },
        { updateTime : '3 Days Ago', productName : 'Nike Lebron Air 1', productPrice : '$130' },
        { updateTime : '5 Days Ago', productName : 'Herschel White Backpack', productPrice : '$125' },
        { updateTime : 'Last Week', productName : 'Baseball Cap', productPrice : '$105' },
        { updateTime : 'Yesterday', productName : 'Premium Foot Pics', productPrice : '$125' },
    ]

    let numberOfCards = carouselSliderData.length


    res.render("./orders/orders_1", {
        carouselSliderData, numberOfCards
    })
})

router.get("/orders_2", (req, res) => {
    res.render("./orders/orders_2", {

    })
})


module.exports = router;

