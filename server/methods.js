function getAvailability(parameters, callback){

    var url = "http://int-eu-svc.qasql.opentable.com/availability/search";

    Meteor.http.call("POST", url, {params: parameters},callback);
}

var wrappedGetAvailability = Meteor._wrapAsync(getAvailability);

Meteor.methods({
    getRestaurant: function (rid) {
        var url = "http://restaurants.services.opentable.com/v3/restaurants/" + rid;

        var data = Meteor.http.call("GET", url).data;
        var cuisine = Meteor.http.call("GET", data.Cuisines["primary"].href).data.Name;
        debugger;

        return {
            Name: data.Name,
            Id:data.id,
            Address: data.Address.Line1 + ", " + data.Address.Line2 + ", " + data.Address.City + ", " + data.Address.PostCode,
            Area: data.NeighborhoodId,
            Cuisine: cuisine,
            PriceBand: data.PriceBand.Name
        };
    },

    searchAvailability: function(bookingViewModel){
        var parameters = {
            RIDs: [96753],
            LocalStartDate: "2013-11-27", //bookingViewModel.bookingDate.toString('yyyy-MM-dd'),
            LocalExactTime: "19:00", //bookingViewModel.bookingTime.toString("HH:mm"),
            PartySize: bookingViewModel.partySize,
            ForwardDays: 0,
            ForwardMinutes: 60,
            BackwardMinutes: 60,
            AllowPOP: true,
            OmitNoTimesRestaurants: false
        };

        return wrappedGetAvailability(parameters).content;

//        var url = "http://int-eu-svc.qasql.opentable.com/availability/search";
//
//        Meteor.http.call("POST", url, {params: parameters},
//            function (error, result) {
//                alert("error was: " + result);
//                //populate timeslots
//            })
    }
});