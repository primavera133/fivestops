if(Meteor.is_client){

	Template.setupTripStopInfo.events({
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

	Template.setupTripStopInfo.tripName = function () {
		return Session.get("tripName");
	};

	Template.setupTripStopInfo.currentStopNr = function () {
		return Session.get("currentStopNr");
	};

	Template.setupTripStopInfo.nextStopNr = function () {
		return parseInt(Session.get("currentStopNr"), 10) + 1;
	};

	Template.setupTripStopInfo.whatStop = function () {
		return helpers.whatStop();
		
	};




	Template.setupTripStopInfo.rendered = function() {
		var tripName = Session.get("tripName");
		if(!tripName){
			Meteor.Router.to("/");
		}

/*
		amplify.subscribe("map/lastMarker/set", function () {
			if(map.lastMarker) {
				$(".btn.next").removeAttr("disabled");
			} else {
				$(".btn.next").attr("disabled", "disabled");
			}

		})
*/

	}
}