if(Meteor.is_client) {

	function Helpers(){
		this.whatStop = function () {
			var currentStop = parseInt(Session.get("currentStopNr"), 10);
			if(currentStop === 1) {
				return "first stop";
			} else if (currentStop === 2) {
				return "second stop";
			} else if (currentStop === 3) {
				return "third stop";
			} else if (currentStop === 4) {
				return "fourth stop";
			} else {
				return "last stop";
			}			

		}
	};
	var helpers = new Helpers();

}
