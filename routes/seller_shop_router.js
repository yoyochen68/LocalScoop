// require
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const db = require("../fake-db");
const router = express.Router();
// const axios = require('axios')



/* Global Variables */

// GET /seller_shop/seller_shop
router.get("/seller_shop/:id", (req, res) => {
    let storeId = req.params.id// req.params.anything will always be a string
    let shop = db.getShop(+storeId)
    let shopPostsList = db.getPostsByStoreId(+storeId)

    console.log(shopPostsList)

    //Address
    let shopAddressFields = shop.address.split(',')
    let city = shopAddressFields[1];
    let province = shopAddressFields[2];
    let location = `${city}, ${province}`

    let placeholderDesc = "We are small local store that aim to bring you the best of quality and make you happy. "

    //Gathering all the required info for the page

    let storeInfo = {
        image:"", //UNCOMPLETED
        location:location,
        name: shop.storeName,
        rating:shop.rating,
        description:placeholderDesc,//UNCOMPLETED
        productsImages:"" //UNCOMPLETED
    }


    res.render("seller_shop/seller_shop", { storeInfo:storeInfo})
})








module.exports = router;