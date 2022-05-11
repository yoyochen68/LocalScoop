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


// GET /add_cart/add_cart
router.get("/add_cart", async(req, res) => {

  /////I NEED HE PRODUCT ID SOMEHOW FROM LAST PAGE
  // let product_id = ""
  let product_id = 2
  let buyer_id = 2


  let cardItemsTotal = await mysqlDB.getCartItemsLength(buyer_id)

  res.render("add_cart/add_cart", {product_id,cardItemsTotal})
})




router.post("/add_cart",  async (req, res) => {

  /////I NEED HE PRODUCT ID SOMEHOW FROM LAST PAGE
  // let product_id = ""
  let product_id = 2
  let buyer_id = 2

  await mysqlDB.addToCart(buyer_id, product_id)
  let cartItemsTotal =  await mysqlDB.getCartItemsLength(buyer_id)

  res.json({ id: cartItemsTotal })
  // return  await mysqlDB.getCartItemsLength(buyer_id)

})


module.exports = router;