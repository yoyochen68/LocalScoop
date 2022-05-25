const help = require("../help")
const express = require("express");
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')

// GET /map/
router.get("/", async (req, res) => {
    let storesAddressAndCategory = await mysqlDB.storesAndCategoryNames()
    console.log(storesAddressAndCategory)
    
    res.render("map_router/map", {
        storesAddressAndCategory
    }) 
})



module.exports = router;