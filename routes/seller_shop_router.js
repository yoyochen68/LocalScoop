// require
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const db = require("../fake-db");
const mysqlDB = require('../database/databaseAccessLayer')

const router = express.Router();
// const axios = require('axios')

const { append } = require("express/lib/response");


/* express */
const app = express();
app.use(express.json())





/* Global Variables */

// GET /seller_shop/seller_shop
 router.get("/seller_shop/:id", async (req, res) => {

    // let id = req.params.id
    let storeId = 1

     let storeInfo =  await mysqlDB.getStoreInfoByStoreId(storeId)
     let productInfo = await mysqlDB.getProductsAndImagesByStoreID(storeId)
     let storeImages = await mysqlDB.getShopPhotoByStoreId(storeId)


// console.log(productInfo)

    //
    // //Gathering all the required info for the page
    // let storeInfo = {
    //     id: storeId,
    //     image:"", //UNCOMPLETED
    //     location:location,
    //     name: shop.storeName,
    //     rating:shop.rating,
    //     description:pageDescription,
    //     followers:followersNumber,
    //     productsImages:"" //UNCOMPLETED
    // }

    // res.send(storeInfo)
    // res.send(productInfo)
    res.render("seller_shop/seller_shop", { storeInfo:storeInfo[0], productInfo:productInfo, storeImages:storeImages })
})








module.exports = router;