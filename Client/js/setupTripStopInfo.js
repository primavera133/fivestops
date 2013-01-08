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
		if(!Session.get("editTripId")){
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
    		    	var data = ko.toJS(this);
    				data.editTripId = Session.get("editTripId");
    				data.currentStopNr = Session.get("currentStopNr");

    		    	Meteor.call('setupTripStopInfo', data, function(err, data) {
    		    		if(Session.get("currentStopNr") < 5) {
	        				return Meteor.Router.to('/setup/map/' + (parseInt(Session.get("currentStopNr"),10) + 1));
    		    		}else{
	        				return Meteor.Router.to('/setup/tag');
    		    		}
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