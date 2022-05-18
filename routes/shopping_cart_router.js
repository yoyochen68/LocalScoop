/* libraries */
const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const db = require("../fake-db");
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')



const { append } = require("express/lib/response");


/* express */
const app = express();
app.use(express.json())


router.get("/shopping_cart", async(req, res) => {
// let buyer_Id = req.session.buyer_Id
let buyer_Id = 1
let cartIterms = await mysqlDB.getCartItemsByBuyer(buyer_Id)
let cartQuantity = await mysqlDB.getCartItemsLength(buyer_Id)
  res.render("shopping_cart/shopping_cart", {buyer_Id,cartIterms,cartQuantity})
})


router.post("/shopping_cart_add",async (req, res)=>{
  let cart_product_id = +req.body.cart_product_id
  let buyer_id = +req.body.buyer_id
  let product_id = +req.body.product_id
  console.log(cart_product_id)
  console.log(buyer_id)
  let cartIterm = await mysqlDB.inCartItem(cart_product_id,buyer_id,product_id)
  console.log(cartIterm)
  let itermQuantity = cartIterm.product_quantity
  let cartQuantity = await mysqlDB.getCartItemsLength(buyer_id)
  // console.log("add",itermQuantity)
  res.json({itermQuantity,cartQuantity})
})


router.post("/shopping_cart_minus",async (req, res)=>{
  let cart_product_id = +req.body.cart_product_id
  let buyer_id = +req.body.buyer_id
  let product_id = +req.body.product_id
  let cartIterm = await mysqlDB.deCartItem(cart_product_id,buyer_id,product_id)
  let itermQuantity = cartIterm.product_quantity
  let cartQuantity = await mysqlDB.getCartItemsLength(buyer_id)
  // console.log("minus",itermQuantity)
  res.json({itermQuantity,cartQuantity})
})

router.post('/shopping_cart_removeItem', async(req, res) => {
  let cart_product_id = +req.body.cart_product_id
  let buyer_id = +req.body.buyer_id
  await mysqlDB.deleteCartItem(cart_product_id)
  res.json({message:"Have remove the item in cart"})
})


// router.post('/checkout',async(req,res)=>{
//   res.redirect('/checkout/checkout')
// })



module.exports = router;