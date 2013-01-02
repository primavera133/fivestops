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
		if(Session.get("tripName")) {
			Meteor.Router.to('/setup/info/' + Session.get("currentStopNr"));
		}

		//ko.validation.rules.pattern.message = 'Invalid';
    
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

    		    	Meteor.call('setupTripStep1', json, function(err, data) {
        				return Meteor.Router.to('/setup/info/1');
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

