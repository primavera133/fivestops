if (Meteor.is_client) {

    Meteor.Router.add({
        '/' : 'home',
        '/setup' : 'setupTrip',
        '/setup/map/:nr' : function (nr) {
            console.log('we are at ' + this.canonicalPath);
            console.log("our parameters: " + this.params);
            Session.set('currentStopNr', nr);
            return 'setupTripStopMap';
        },
        '/setup/info/:nr' : function (nr) {
            console.log('we are at ' + this.canonicalPath);
            console.log("our parameters: " + this.params);
            Session.set('currentStopNr', nr);
            return 'setupTripStopInfo';
        },

        '/join' : 'listTrip'
    })

}