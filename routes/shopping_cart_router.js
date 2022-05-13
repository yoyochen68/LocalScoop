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

// console.log(cartIterms)
// console.log(cartQuantity)
  res.render("shopping_cart/shopping_cart", {buyer_Id,cartIterms,cartQuantity})
})







module.exports = router;