const express = require("express");
const router = express.Router();
const db = require("../fake-db");

// GET /shop_setup/a
router.get("/a", (req, res) => {
    res.render("index")
})

router.get("/shop_setup_4", (req, res) => {
    res.render("shop_setup/shop_setup_4", {

    })
})


router.post('/product_type', (req, res) => {

    let data = req.body.productTypeList
    console.log("backEnd: ", data)
    res.send(data)
})

    module.exports = router;