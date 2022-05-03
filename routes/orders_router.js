const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const db = require("../fake-db");
const router = express.Router();


/* express */
const app = express();
app.use(express.json())

// GET orders/orders_1
router.get("/orders_1", (req, res) => {
    res.render("./orders/orders_1", {

    })
})

router.get("/orders_2", (req, res) => {
    res.render("./orders/orders_2", {

    })
})


module.exports = router;