if (Meteor.is_client) {
//	Template.setupTripTag.events({

//	})

	Template.setupTripStopInfo.tripName = function () {
		return Session.get("tripName");
	};

}