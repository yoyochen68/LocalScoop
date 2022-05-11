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
 router.get("/seller_shop", async (req, res) => {

  //WORK ON LOCALHOST
  //   let storeId = req.params.id
    let storeId = req.session.storeId
  // let storeId = 1

     let storeInfo = await mysqlDB.getStoreInfoByStoreId(storeId)
     let productInfo = await mysqlDB.getProductsAndImagesByStoreID(storeId)
     let storeImages = await mysqlDB.getShopPhotoByStoreId(storeId)

     res.render("seller_shop/seller_shop", { storeInfo:storeInfo[0], productInfo:productInfo, storeImages:storeImages })
})




module.exports = router;