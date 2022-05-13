/* libraries */
const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const db = require("../fake-db");
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')



router.get("/a", (req, res) => {
  res.redirect("/add_cart/add_cart")
})

// GET /add_cart/add_cart
router.get("/add_cart/:id", async(req, res) => {

  let product_id = req.params.id
  // let buyer_id = req.session.id

  let buyer_id = 1


  let productInfo = await mysqlDB.getProductsAndImages(product_id)
  let storeInfo = await mysqlDB.getStoreInfoByStoreId(productInfo[0].store_id)
  let cartItemsTotal =  await mysqlDB.getCartItemsLength(buyer_id)


// res.send(product_id)
  res.render("add_cart/add_cart", {productInfo: productInfo[0], storeInfo:storeInfo[0], cardItemsTotal:cartItemsTotal})
})




router.post("/add_cart/:id",  async (req, res) => {

  /////I NEED HE PRODUCT ID SOMEHOW FROM LAST PAGE

  // let product_id = 2
  let product_id = req.params.id
  let buyer_id = 1

  await mysqlDB.addToCart(buyer_id, product_id)
  let cartItemsTotal =  await mysqlDB.getCartItemsLength(buyer_id)
console.log("checking",cartItemsTotal)
  res.json( {quantity: cartItemsTotal })
  // return  await mysqlDB.getCartItemsLength(buyer_id)

})


module.exports = router;