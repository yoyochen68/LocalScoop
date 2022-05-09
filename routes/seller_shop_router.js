// require
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const db = require("../fake-db");
const router = express.Router();

const realDb = require(`../database/databaseAccessLayer.js`)
const mysqlDB = require("../database/databaseAccessLayer");
const {getStoreInfoByStoreId} = require("../database/databaseAccessLayer");
// const axios = require('axios')


// GET /seller_shop/seller_shop
router.get("/seller_shop/:id",  async (req, res) => {
    try {
        let storeId = req.params.id// req.params.anything will always be a string
        //////////////////////////////////////////

        let productInfo = await realDb.getProductsByStoreId(storeId)
        let storeInfo = await realDb.getStoreInfoByStoreId(storeId)

        res.render("seller_shop/seller_shop", {storeInfo: storeInfo, productInfo:productInfo})

    }catch (error){
        res.send(error)
    }
})


console.log()





module.exports = router;