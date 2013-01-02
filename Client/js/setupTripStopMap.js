if(Meteor.is_client){

	Template.setupTripStopMap.events({
		'click .modal-opener' : function (e) {
			var modalId = $(e.target).data("modal-id");
			if(modalId){
				$("#" + modalId).modal();
			}
		},

		'click .btn.next' : function (e) {
			if(map.lastMarker) {
				$(this).prop("disabled", false);
			} else {
				$(this).prop("disabled", true);
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
			} else {
				$(".btn.next").attr("disabled", "disabled");
			}

		})

	}
}