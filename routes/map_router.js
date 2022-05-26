const help = require("../help")
const express = require("express");
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')
const axios = require("axios");
const { type } = require("express/lib/response");

// GET /map/
router.get("/", (req, res) => {
	res.render("map_router/map")
})


// AJAX-REQUEST: POST /map/get_store_info
router.post('/get_store_info', async (req, res) => {
	let markerData = await mysqlDB.storesAndCategoryNames();

	let markerDataForFrontEnd = [];

	for (store of markerData) {
		let theContent = `
			<div style="background-color: #F7F7F3; height: 200px; width: 200px; border-radius: 10px;">	
				<h4>${store.store_name}</h4> 
				<p>Address: ${store.store_address}</p>
				<p>Phone: ${store.store_phone_number}</p>
				<p>Rating: ${store.rating}</p>
				<p>We do: ${store.category_name}
			</div>`

		let coordinatesJSON = JSON.parse(`{ ${store.coordinates} }`)
		
		let pushObject = {
			coordinates: coordinatesJSON,
			content: theContent
		}

		markerDataForFrontEnd.push(pushObject)
	}
	res.status(200).send(markerDataForFrontEnd);
})

module.exports = router;

