function Map() {

	var self = this, lastLatLng;
	this.geocoder = new google.maps.Geocoder();
	this.infoWindow = new google.maps.InfoWindow;
	
	this.mapOptions = {
				zoom: 13,
				mapTypeControl: false,
				navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

	var geo = {
		success: function(position) {

			var mapcanvas = document.querySelector(".map-canvas");

			self.mapOptions.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			self.map = new google.maps.Map(mapcanvas, self.mapOptions);

			amplify.publish("map/init");

			/*
			var marker = new google.maps.Marker({
				position: latlng, 
				map: self.map, 
				title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
			});
			*/

		},
		error: function(msg) {
			var s = document.querySelector('#main');
			s.innerHTML = typeof msg == 'string' ? msg : "failed";
			s.className = 'fail';
		}
	};

	this.initFromPosition = function () {

	    if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(geo.success, geo.error);
    	} else {
      		error('not supported');
    	}

	};

	this.setupGetCoordsFromRightClick = function () {

		amplify.subscribe("map/init", function () {

			google.maps.event.addListener(self.map, "rightclick", function(event) {
	    		var lat = event.latLng.lat();
	    		var lng = event.latLng.lng();

	    		amplify.publish("map/coords", new google.maps.LatLng(lat, lng));
	    	});
		});


	};

	this.setupSetPoiFromCoords = function () {
		amplify.subscribe("map/coords", function (latLng) {
			console.log("map/coords", arguments);

			var image = "/img/beachflag.png";
			var beachMarker = new google.maps.Marker({
            	position: latLng,
            	map: self.map,
            	icon: image
        	});
		})

	}

	this.setupStops = function () {
		//We need to do a little workaround for mobile touch events, using hammer.js
		
		//1. register normal click listener with Google map API
		//   store the lat-lng from this listener
		google.maps.event.addListener(self.map, 'mousedown', function (e) {
			lastLatLng = e.latLng;
		});

		//2. register hammer to listen for mobile hold events
		$(".map-canvas").hammer({
   			prevent_default: false,
        	drag_vertical: false
    	})
    	.bind("hold", function(ev) {
			if (self.lastMarker) {
				self.lastMarker.setMap(null);
			}
			self.lastMarker = new google.maps.Marker({position: lastLatLng, map: self.map});

			amplify.publish("map/lastMarker/set");
			
    	});

	}


};
