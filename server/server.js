if (Meteor.isServer) {
    Meteor.startup(function () {


//        var restaurant = Meteor.http.call("GET", "http://restaurants.services.opentable.com/v3/restaurants/68629");
//        Meteor._debug(restaurant.data);
//        Meteor._debug(Meteor.http.call("GET", "http://restaurants.services.opentable.com/v3/cuisines/en-GB/7003").data);
    });
}