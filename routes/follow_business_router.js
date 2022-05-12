/* libraries */
const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')

const { append } = require("express/lib/response");



// GET /follow_business/follow_business_1
router.get("/follow_business_1", (req, res) => {

    res.render("/follow_business/follow_business_1")
})


// GET /follow_business/follow_business_2
router.get("/follow_business_2", (req, res) => {

    res.render("/follow_business/follow_business_2")
})



module.exports = router;