const help = require("../help")
const express = require("express");
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')

// GET /map/
router.get("/", (req, res) => {
    res.render("map_router/map")
})

module.exports = router;