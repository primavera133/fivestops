if(Meteor.is_client) {

	Template.setupTrip.events({
		'click .icon-info-sign' : function (e) {
			var modalId = $(e.target).data("modal-id");
			if(modalId){
				$("#" + modalId).modal();
			}
		}

	});

	Template.setupTrip.rendered = function () {
	    var trip = Trips.findOne({_id:$.cookie("5Stops_edit_id")});
		if(trip) {
			Session.set("tripName", trip.tripName);
			Session.set("editTripId", trip._id);
		    if(!trip.lat) {
		        Meteor.Router.to('/setup/map/1');
		    } else if(!trip.stopDescription) {
		        Meteor.Router.to('/setup/info/1');
		    } else if (trip.stopDescription.length === 5) {             
		        Meteor.Router.to('/setup/tag');
		    } else if (trip.lat.length === trip.stopDescription.length) {               		    	
		        Meteor.Router.to('/setup/map/' + (trip.lat.length + 1));
		    } else {
		        Meteor.Router.to('/setup/info/' + trip.lat.length);
		    }
		}
    
		ko.validation.configure({
		    registerExtenders: true,
		    messagesOnModified: true,
		    insertMessages: true,
		    parseInputAttributes: true,
		    messageTemplate: null
		});

		var viewModel = {
    		trip_name: ko.observable().extend({ minLength: 5, maxLength: 100, required: true }),
    		trip_description: ko.observable().extend({ minLength: 25, maxLength: 500, required: true }),
    		submit: function () {
    		    if (viewModel.errors().length == 0) {
    		    	var json = ko.toJS(this);
    				Session.set("tripName", json.trip_name);

    		    	Meteor.call('setupTrip', json, function(err, uid) {
    		    		Session.set("editTripId", uid);
    					$.cookie('5Stops_edit_id', uid, {expires:7, path: '/'});
	    				$.cookie('5Stops_edit_name', json.trip_name, {expires:7, path: '/'});

        				return Meteor.Router.to('/setup/map/1');
      				});
        		} else {
	    	        viewModel.errors.showAllMessages();
    		    }
    		}
		};

		ko.applyBindings(viewModel);
		viewModel.errors = ko.validation.group(viewModel);



	}


}

