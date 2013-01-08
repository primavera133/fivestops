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
		var tripName = Session.get("tripName");
		if(!tripName){
			Meteor.Router.to("/");
		}

		map.initFromPosition();
		
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