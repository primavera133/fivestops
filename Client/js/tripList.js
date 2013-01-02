if(Meteor.is_client) {

	Template.tripList.getTrips = function () {
		return Trips.find({}, {sort: {trip_name: 1}});
	}

}