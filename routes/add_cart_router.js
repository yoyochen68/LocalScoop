/* libraries */
const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')





//all products
router.get("/products",  async (req, res) => {


  // let buyer_id = req.session.id
  let buyer_id = 1

  let productInfo = await mysqlDB.getRandomProducts(6)
  let cartItemsTotal =  await mysqlDB.getCartItemsCount(buyer_id)



  res.render("add_cart/products", {productInfo:productInfo, cartItemsTotal:cartItemsTotal })

})





// single product
// GET /add_cart/add_cart/id
router.get("/add_cart/:id", async(req, res) => {

  let product_id = req.params.id
  // let buyer_id = req.session.id
  let buyer_id = 1

  let productInfo = await mysqlDB.getProductsAndImages(product_id)
  let storeInfo = await mysqlDB.getStoreInfoByStoreId(productInfo[0].store_id)
  let cartItemsTotal =  await mysqlDB.getCartItemsCount(buyer_id)

  res.render("add_cart/add_cart", {productInfo: productInfo[0], storeInfo:storeInfo[0], cartItemsTotal:cartItemsTotal})
})





// ajax request destination
router.post("/add_cart/:id",  async (req, res) => {

  let product_id = req.params.id
  //let buyer_id = req.session.id
  let buyer_id = 1

  await mysqlDB.addToCart(buyer_id, product_id)
  let cartItemsTotal =  await mysqlDB.getCartItemsCount(buyer_id)
   res.json( {quantity: cartItemsTotal })

})











module.exports = router;