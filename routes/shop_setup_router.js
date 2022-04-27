const express = require("express");
const router = express.Router();
const db = require("../fake-db");

// GET /shop_setup/a
router.get("/a", (req, res) => {
    res.render("index")
})




module.exports = router;