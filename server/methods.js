Meteor.methods({
    getRestaurant: function (rid) {
        var url = "http://restaurants.services.opentable.com/v3/restaurants/" + rid;

        var data = Meteor.http.call("GET", url).data;
        var cuisine = Meteor.http.call("GET", data.Cuisines["primary"].href).data.Name;


        return {
            Name: data.Name,
            Id:data.id,
            Address: data.Address.Line1 + ", " + data.Address.Line2 + ", " + data.Address.City + ", " + data.Address.PostCode,
            Area: data.NeighborhoodId,
            Cuisine: cuisine,
            PriceBand: data.PriceBand.Name
        };
    }
});