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


/* Global Variables */





// GET /seller_shop/seller_shop
router.get("/seller_shop/:id",  async (req, res) => {
    try {
        let storeId = req.params.id// req.params.anything will always be a string
        //////////////////////////////////////////

        let productInfo = await realDb.getProductsByStoreId(storeId)
        let storeInfo = await realDb.getStoreInfoByStoreId(storeId)

        // console.log( dataFromDb[0])
        // //////////////////////////////////////////
        //
        // let shop = db.getShop(+storeId)
        // let shopPostsList = db.getPostsByStoreId(+storeId)
        //
        // //Address
        // let shopAddressFields = shop.address.split(',')
        // let location = `${shopAddressFields[1]}, ${shopAddressFields[2]} `//city+province
        //
        // let followersNumber = !shop.followers ? 0 : shop.followers
        //
        // let placeholderDesc = "We are small local store that aim to bring you the best of quality and make you happy. "
        // let pageDescription = !shop.description ? placeholderDesc : shop.description
        //
        //
        // //Gathering all the required info for the page
        // let storeInfo = {
        //     id: storeId,
        //     image: "", //UNCOMPLETED
        //     location: location,
        //     name: shop.storeName,
        //     rating: shop.rating,
        //     description: pageDescription,
        //     followers: followersNumber,
        //     productsImages: "" //UNCOMPLETED
       // }

// res.send(productInfo)
//         res.send(storeInfo[0].photo_file_path)
//         res.send(storeInfo)
        res.render("seller_shop/seller_shop", {storeInfo: storeInfo[0], productInfo:productInfo[0]})

    }catch (error){
        res.send(error)
    }
})


console.log()





module.exports = router;