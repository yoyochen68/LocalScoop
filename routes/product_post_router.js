// require
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const db = require("../fake-db");
const router = express.Router();
// const axios = require('axios')





/* Global Variables */

// GET /product_post/product_post_1
router.get("/product_post_1", (req, res) => {
    res.render("product_post/product_post_1", {

    })
})


// -- NOT MADE YET ---
// GET /product_post/product_post_2
router.get("/product_post_2", (req, res) => {
    res.render("product_post/product_post_2", {

    })
})







module.exports = router;