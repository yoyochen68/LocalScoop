/* libraries */
const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const db = require("../fake-db");
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')
const luxon = require('luxon')

let DateTime = luxon.DateTime;

/*
    {
        order_id: 4,
        product_id: 5,
        buyer_id: 1,
        store_id: 2,
        order_status_id: 1,
        order_timestamp: null,
        product_name: 'Air Jordan Basketball Shoes',
        product_category: 'Shoes',
        product_description: 'Basketball shoes, mens and womens sizes: 8 to 14',
        product_price: '140.00',
        product_delivery_fee: '15.00',
        product_timestamp: null,
        productcol: null
    }
*/

// GET orders/orders_1
router.get("/orders_1", async (req, res) => {
    let storeId = req.session;

    // if user not logged in, redirect to login page
    if(storeId == undefined){
        res.redirect("/")
    }

    let carouselSliderData = await mysqlDB.getOrdersWithProductsPhotosByStoreId(2)
    // change the db () so that the photo shows
    
    for(let order of carouselSliderData){
        let timestamp = +order.product_timestamp;
        let timeInfo = DateTime.fromMillis(timestamp);
        let howManyDaysAgo = timeInfo.plus({ days: 0 }).toRelativeCalendar()
        
        order.how_many_days_ago = howManyDaysAgo
    }

    // console.log(carouselSliderData)

    res.render("./orders/orders_1", {
       carouselSliderData 
    })  
})




router.get("/orders_2", (req, res) => {
    console.log('aaaaa')
    
    let productListInfo = [
        { itemName: "Ultra Boost 912", deliveryStatus: "Pending Delivery", feedbackStatus: "", time: "Today" },
        { itemName: "Nike AirMax", deliveryStatus: "Delivered", feedbackStatus: "You have new feedback", time: "2 Days Ago" },
        { itemName: "Nike AirForce", deliveryStatus: "Delivered", feedbackStatus: "You have new feedback", time: "3 Days Ago" },
        { itemName: "Nike Blazer", deliveryStatus: "Delivery Pending", feedbackStatus: "", time: "4 Days Ago" },
        { itemName: "Mens Leather Boots", deliveryStatus: "Delivered", feedbackStatus: "", time: "1 Week Ago" },
        { itemName: "Ultra Boost 912", deliveryStatus: "Pending Delivery", feedbackStatus: "", time: "1 Week Ago" },
        { itemName: "Nike AirMax", deliveryStatus: "Delivered", feedbackStatus: "You have new feedback", time: "1 Week Ago" },
        { itemName: "Nike AirForce", deliveryStatus: "Delivered", feedbackStatus: "You have new feedback", time: "1 Week Ago" },
        { itemName: "Nike Blazer", deliveryStatus: "Delivery Pending", feedbackStatus: "", time: "2 Weeks Ago" },
        { itemName: "Mens Leather Boots", deliveryStatus: "Delivered", feedbackStatus: "", time: "2 Weeks Ago" }, 
    ]
    
    
    res.render("./orders/orders_2", {
        productListInfo
    })
})


module.exports = router;

