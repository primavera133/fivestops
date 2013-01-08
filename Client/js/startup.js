Trips = new Meteor.Collection('trips');

if (Meteor.is_client) {

	Meteor.startup(function () {

        window.map = new Map();

	});
}

if(Meteor.is_server) {
    Meteor.startup(function () {
        /*
        if(Trips.find().count() === 0 ) {
            Trips.insert({tripName: "test"})
        }
        */
    });
}