if (Meteor.isClient) {
    Template.profile.restaurant = function () {
        Meteor.call('getRestaurant', 4051, function(err,response) {
            if(err) {
                rest = "error";
                return;
            }
            Session.set('restaurant', response)
        });
        return Session.get('restaurant');
    };

    Template.booking_box.hours = function () {
        var hours = [];
        for (var i = 0; i < 24; i++)
        {
            hours.push({text: i + ":00", val: i});
            hours.push({text: i + ":30", val: i + 0.5});
        }
        return hours;
    };

    Template.booking_box.rendered = function () {
        $('#datepicker').datepicker({weekStart:1});
    };
}

if (Meteor.isServer) {
    Meteor.startup(function () {
//        var restaurant = Meteor.http.call("GET", "http://restaurants.services.opentable.com/v3/restaurants/68629");
//        Meteor._debug(restaurant.data);
//        Meteor._debug(Meteor.http.call("GET", "http://restaurants.services.opentable.com/v3/cuisines/en-GB/7003").data);
    });
}