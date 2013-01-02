if(Meteor.is_client) {
	
	function Store() {
		this.setup = function () {
			console.log("Store.setup");
			window.onbeforeunload = function() {
				var message = 'Reloading will restart the app!'; 
    			var e = e || window.event;
				// For IE and Firefox prior to version 4
			    if (e) {
			        e.returnValue = message ;
			    }
			    // For Safari
			    return message;
			}
		}

	}
	var store = new Store();
	//store.setup();	

}
