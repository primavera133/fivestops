if (Meteor.is_client) {
	Template.deleteTripModal.events({
		"click .btn.yes" : function (e) {
			e.preventDefault();

			Meteor.call('setupDeleteTrip', Session.get("editTripId"), function () {
				Meteor.Router.to("/");
			});

			$("#deleteTripModal").modal("hide");

		},
		'click .btn.no' : function (e) {
			e.preventDefault();
			$("#deleteTripModal").modal("hide");
		}
	});



}