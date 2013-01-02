if (Meteor.isServer) {
	Meteor.startup(function () {
    	// code to run on server at startup
	});

	Meteor.methods({
		'setupTripStep1' : function (js) {
			var tripName = js.trip_name,
				tripDescription = js.trip_description;

			return Trips.insert({
				tripName: tripName,
				tripDescription: tripDescription
			});

		}
	})
}
