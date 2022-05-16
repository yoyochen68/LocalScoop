/* libraries */
const express = require("express");
const ejs = require('ejs');
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')



const { append } = require("express/lib/response");


/* express */
const app = express();
app.use(express.json())


router.get("/checkout", (req, res) => {
    res.render("checkout/checkout")
})


router.get("/checkout_confirmation", (req, res) => {
    res.render("checkout/checkout_confirmation")
})




module.exports = router;