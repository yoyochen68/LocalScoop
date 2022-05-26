let map;

/**
 * @param {object} props 
 * takes an object with keys:
 * 'coords': {lat: 49.0321, lng: -123.1222}
 * 'icon': <icon url goes here>
 * 'content': html string of what to display
 */
function addMarker(props) {
	let infoWindow;

	let marker = new google.maps.Marker({
		position: props.coords,
		map: map,
	});

	// if custom icon exists, set icon
	if (props.icon) {
		marker.setIcon(props.icon)
	}

	// check if there is custom content for the marker
	if (props.content) {
		infoWindow = new google.maps.InfoWindow({
			content: props.content
		})
	}

	marker.addListener('click', () => {
		infoWindow.open(map, marker)
	})
}


// google maps API will call this automatically
function initMap() {
	let options = {
		zoom: 9,
		center: { lat: 49.2827, lng: -123.1207 },
	}
	
	map = new google.maps.Map(document.getElementById("map"), options);
	
	// ajax request to get the store data
	fetch("/map/get_store_info", {
		method: "POST",
		// body: JSON.stringify('a'),
		headers: {
			"Content-Type": "application/json"
		},
	})
	.then(function (response){
		return response.json();
	})
	.then((data) => {
		let storeDataForMarkers = JSON.stringify(data);

		// call addMarker() here
		addMarker({
			coords: { lat: 49.0321, lng: -123.1222 },
			icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
			content: `
				<div style="background-color: #F7F7F3; height: 200px; width: 200px; border-radius: 10px;">
					<img class="markerImg"src="/logo/localscooplogo2.png" alt="">	
					<h4> store_name </h4> 
					<p>store_address</p>
					<p>store_phone_number</p>
					<p>store_rating</p>
				</div>`
		})

	})
	window.initMap = initMap;
}
