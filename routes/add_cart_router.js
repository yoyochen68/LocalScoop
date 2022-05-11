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


// GET /add_cart/add_cart
router.get("/add_cart", (req, res) => {
  res.render("add_cart/add_cart", {
  })
})






module.exports = router;