if(Meteor.is_client){

	Template.setupTripStopMap.events({
		'click .modal-opener' : function (e) {
			var modalId = $(e.target).data("modal-id");
			if(modalId){
				$("#" + modalId).modal();
			}
		},
		'click .btn.next' : function (e) {
			e.preventDefault();

		    if (Session.get("editTripId") && map.lastMarker) {
		    	var data = {
		    		editTripId : Session.get("editTripId"),
		    		currentStopNr: Session.get("currentStopNr"),
		    		lat : map.lastMarker.position.lat(),
		    		lng : map.lastMarker.position.lng()
		    	}
		    	Meteor.call('setupTripStopMap', data, function(err, uid) {
    				return Meteor.Router.to('/setup/info/' + Session.get("currentStopNr"));
  				});
    		}
		},
		'click .btn.delete' : function (e) {
			e.preventDefault();
			$("#deleteTripModal").modal("show");

		}


	});

	Template.setupTripStopMap.tripName = function () {
		return Session.get("tripName");
	};

	Template.setupTripStopMap.currentStopNr = function () {
		return Session.get("currentStopNr");
	};

	Template.setupTripStopMap.whatStop = function () {
		return helpers.whatStop();
		
	};

	Template.setupTripStopMap.rendered = function() {
		var trip = Trips.findOne({_id: $.cookie("5Stops_edit_id")});
		if(!trip.tripName){
			Meteor.Router.to("/");
		}

		if(trip.lat) {

			map.initMap({
				coords: {
					latitude: _.last(trip.lat),
					longitude: _.last(trip.lng)
				}
			});
								
		} else {
			map.initMap();
		}
		
		amplify.subscribe("map/init", function () {			
			map.setupStops();
		});

		amplify.subscribe("map/lastMarker/set", function () {
			if(map.lastMarker) {
				$(".btn.next").removeAttr("disabled");
				$(".next").show();
			}
		})

	}
}