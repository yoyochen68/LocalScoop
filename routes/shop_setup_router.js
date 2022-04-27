// require 
const express = require("express");
const db = require("../fake-db");
const router = express.Router();
// const path = require('path')  is for app.use(express.static())


/* Global Variables */



// GET /shop_setup/a
router.get("/a", (req, res) => {
   let expShopProfilePhotoFilename = db.getShopProfilePhotoFilename(101);
    
   // res.render("index", {

    // })
})


// GET /shop_setUp/shop_setUp_2
router.get("/shop_setUp_2", (req, res) => {
    res.render("shopSetUp/shopSetUp_2", {

    })
})

// GET /shop_setUp/shop_setUp_2
router.get("/shop_setUp_2", (req, res) => {
    res.render("shopSetUp/shopSetUp_2", {

    })
})

// GET /shop_setUp/shop_setUp_3
router.get("/shop_setUp_3", (req, res) => {
    res.render("shopSetUp/shopSetUp_3", {

    })
})

// GET /shop_setUp/shop_setUp_4
router.get("/shop_setUp_4", (req, res) => {
    res.render("shopSetUp/shopSetUp_4", {

    })
})

// GET /shop_setUp/shop_setUp_5
router.get("/shop_setUp_5", (req, res) => {
    res.render("shopSetUp/shopSetUp_5", {

    })
})

// GET /shop_setUp/shop_setUp_6
router.get("/shop_setUp_6", (req, res) => {
    res.render("shopSetUp/shopSetUp_6", {

    })
})

// GET /shop_setUp/shop_setUp_7
router.get("/shop_setUp_7", (req, res) => {
    res.render("shopSetUp/shopSetUp_7", {

    })
})





module.exports = router;