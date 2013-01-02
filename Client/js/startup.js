if (Meteor.is_client) {

    var Trips = new Meteor.Collection('trips');

	Meteor.startup(function () {

        window.map = new Map();

	});
}