if(Meteor.is_client){

	Template.setupTripStopInfo.events({
		'click .modal-opener' : function (e) {
			var modalId = $(e.target).data("modal-id");
			if(modalId){
				$("#" + modalId).modal();
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

		ko.validation.configure({
		    registerExtenders: true,
		    messagesOnModified: true,
		    insertMessages: true,
		    parseInputAttributes: true,
		    messageTemplate: null
		});

		var viewModel = {
    		stop_pre_description: ko.observable().extend({ minLength: 20, maxLength: 500, required: true }),
    		stop_description: ko.observable().extend({ minLength: 20, maxLength: 500, required: true }),
    		submit: function () {
    		    if (viewModel.errors().length == 0) {
    		    	var json = ko.toJS(this);
    				Session.set("tripName", json.trip_name);

    		    	Meteor.call('setupTripStep1', json, function(err, data) {
        				return Meteor.Router.to('/setup/map/1');
      				});
        		} else {
	    	        viewModel.errors.showAllMessages();
    		    }
    		}
		};

		ko.applyBindings(viewModel);
		viewModel.errors = ko.validation.group(viewModel);



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