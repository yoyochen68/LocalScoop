/* libraries */
const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const db = require("../fake-db");
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')


// GET /add_cart/add_cart
router.get("/add_cart", async(req, res) => {

  // I NEED HE PRODUCT ID SOMEHOW FROM LAST PAGE
  // let product_id = ""
  let product_id = 2
  let buyer_id = 2


  let cardItemsTotal = await mysqlDB.getCartItemsLength(buyer_id)
  let productInfo = await mysqlDB.getProductsAndImages(product_id)
  let storeInfo = await mysqlDB.getStoreInfoByStoreId(productInfo[0].store_id)

  console.log(productInfo)

  res.render("add_cart/add_cart", {productInfo: productInfo[0], storeInfo:storeInfo[0], cardItemsTotal})
})




router.post("/add_cart",  async (req, res) => {

  /////I NEED HE PRODUCT ID SOMEHOW FROM LAST PAGE
  // let product_id = ""
  let product_id = 2
  let buyer_id = 2

  await mysqlDB.addToCart(buyer_id, product_id)
  let cartItemsTotal =  await mysqlDB.getCartItemsLength(buyer_id)

  res.json( {quantity: cartItemsTotal })
  // return  await mysqlDB.getCartItemsLength(buyer_id)

})


module.exports = router;