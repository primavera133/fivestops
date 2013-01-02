if (Meteor.is_client) {
	Template.searchAddressModal.events({
		"submit form" : function (e) {
			e.preventDefault();
		}
	});

	Template.searchAddressModal.rendered = function () {

		$("input[type=search]").autocomplete({

			source: function(request, response) {
       
		        map.geocoder.geocode( {'address': request.term }, function(results, status) {
		        	if (status == google.maps.GeocoderStatus.OK) {

			            var searchLoc = results[0].geometry.location,
			            	latlng = new google.maps.LatLng(searchLoc.lat(), searchLoc.lng()),
			            	bounds = results[0].geometry.bounds;

		        	    map.geocoder.geocode({'latLng': latlng}, function(results1, status1) {
              				if (status1 == google.maps.GeocoderStatus.OK) {
                				if (results1[1]) {
                  					response($.map(results1, function(loc) {
                    					return {
                      						label  : loc.formatted_address,
				                    		value  : loc.formatted_address,
				                    		latLng : loc.geometry.location,
				                    		locType : loc.geometry.location_type,
					                    	bounds   : loc.geometry.bounds
					                    }
        	        				}));
            	    			}
              				}
        				});
          			}
        		});
	      	},
	    	select: function(event,ui) {
	        	//var lct = ui.item.locType;
	        	var bounds = ui.item.bounds,
	        		label = ui.item.label;
	        		latLng = ui.item.latLng;


		        if (bounds){
	          		map.map.fitBounds(bounds);
	        	} else if(latLng) {
		        	map.lastLatLng = latLng;
		        	if(map.lastMarker) {
			        	map.lastMarker.setMap(null);
		        	}
		        	map.lastMarker = new google.maps.Marker({position: map.lastLatLng, map: map.map});

					google.maps.event.addDomListener(map.lastMarker, 'click', function() {
    					map.infoWindow.setContent(label);
    					map.infoWindow.open(map.map, map.lastMarker);
    					
					});

	        		map.map.setCenter(map.lastLatLng);
	        		map.map.setZoom(15);

	        		amplify.publish("map/lastMarker/set");
	        	}

	        	$("#searchAddressModal").modal("hide");
	      	}
      
    	});

	}

}