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

// GET /seller_shop/seller_shop
router.get("/seller_shop", (req, res) => {
    res.render("seller_shop/seller_shop", {

    })
})








module.exports = router;