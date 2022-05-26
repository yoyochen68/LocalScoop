const help = require("../help")
const express = require("express");
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')
const axios = require("axios")

// GET /map/
router.get("/", (req, res) => {
    res.render("map_router/map")
})

// AJAX-REQUEST: POST /map/get_store_info
router.post('/get_store_info', async (req, res) => {
    let markerData = await mysqlDB.storesAndCategoryNames();

    for(store of markerData){
        console.log(store)
    }

    let markerDataEdited = [];   




    res.status(200).send(markerData);    
})


module.exports = router;



/*
addMarker({
		coords: { lat: 49.0321, lng: -123.1222 },
		icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
		content: `<h1> marker 1 </h1> <img class="markerImg"src="/logo/localscooplogo2.png" alt="">`
	})
*/