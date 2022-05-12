/* libraries */
const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const db = require("../fake-db");
const router = express.Router();



const { append } = require("express/lib/response");


/* express */
const app = express();
app.use(express.json())


router.get("/shopping_cart", (req, res) => {
  res.render("shopping_cart/shopping_cart", {
  })
})







module.exports = router;