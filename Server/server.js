if (Meteor.isServer) {
	Meteor.startup(function () {
    	// code to run on server at startup
	});

	Meteor.methods({
		'setupTrip' : function (js) {
			var tripName = js.trip_name,
				tripDescription = js.trip_description;

			return Trips.insert({
				tripName: tripName,
				tripDescription: tripDescription
			});

		},
		'setupTripStopMap' : function (js) {
			var trip = Trips.findOne({_id: js.editTripId});
			delete trip._id;

			console.log("trip: " + trip);

			if(!trip.lat){
				trip.lat = [js.lat];
			} else {
				trip.lat[js.currentStopNr-1] = js.lat;
			}

			if(!trip.lng){
				trip.lng = [js.lng];
			} else {
				trip.lng[js.currentStopNr-1] = js.lng;
			}

			return Trips.update(js.editTripId, {$set: trip});
		},
		'setupTripStopInfo' : function (js) {
			var trip = Trips.findOne({_id: js.editTripId});
			delete trip._id;

			if(!trip.stopPreDescription){
				trip.stopPreDescription = [js.stop_pre_description];
			} else {
				trip.stopPreDescription[js.currentStopNr-1] = js.stop_pre_description;
			}

			if(!trip.stopDescription){
				trip.stopDescription = [js.stop_description];
			} else {
				trip.stopDescription[js.currentStopNr-1] = js.stop_description;
			}
			return Trips.update(js.editTripId, {$set: trip});
		}

	})
}
