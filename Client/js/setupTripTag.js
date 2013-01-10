if (Meteor.is_client) {
	Template.setupTripTag.events({
		'submit form' : function (e) {
			e.preventDefault();
			amplify.publish("setup/tags/add", $("#addTag").val());
		},
		'click .btn.delete' : function (e) {
			e.preventDefault();
			$("#deleteTripModal").modal("show");

		}

	});

	Template.setupTripTag.rendered = function () {

		var tagsAmount = 0;

		amplify.subscribe("setup/tags/add", function (tag) {
			var found = false;
			var list = $("#tags");

			tagsAmount += 1;
			$("#tagsHeader").show();
			if(tagsAmount >= 3){
				$(".btn.next").removeAttr("disabled");
			}

			list.find("li").each(function(idx, li) {
				if($(li).data('tag') === tag){
					found = true;
				}
			})
			if(!found){
				list.append('<li data-tag="' + tag + '"><span class="btn btn-mini">' + tag + '<a href="#" class="icon-remove-sign"></a></span></li>');
			}


			$("#addTag").val('');


		});
	}

	Template.setupTripStopInfo.tripName = function () {
		return Session.get("tripName");
	};

}