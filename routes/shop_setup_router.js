const express = require("express");
const router = express.Router();
const db = require("../fake-db");
// path is for app.use(express.static())

// GET /shop_setup/a
router.get("/a", (req, res) => {
    res.render("index")
})

// GET /shop_setUp/shop_setUp_5
router.get("/shop_setUp_5", (req, res) => {
    res.render("shopSetUp/shopSetUp_5")
})

router.get("/shop_setUp_6", (req, res) => {
    res.render("shopSetUp/shopSetUp_6", {

    })
})


router.get("/shop_setUp_7", (req, res) => {
    res.render("shopSetUp/shopSetUp_7", {

    })
})





module.exports = router;