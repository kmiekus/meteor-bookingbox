Session.set('showTimeSlots', false);
Session.set('timeSlots', null);

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

    Template.box.showTimeSlots = function () {
        return Session.get("showTimeSlots");
    };

    Template.timeslots.timeslots = function () {
        return Session.get("timeSlots");
    };

    Template.booking_box.hours = function () {
        var hours = [];
        for (var i = 0; i < 24; i++)
        {
            hours.push({text: i + ":00", val: i, selected: (i == 19)});
            hours.push({text: i + ":30", val: i + 0.5});
        }
        return hours;
    };

    Template.booking_box.partysizes = function () {
        var partysizes = [];
        var label = "";
        for (var i = 1; i < 21; i++)
        {
            label = (i == 1 ? " Person" : " People");
            partysizes.push({text: i +  label, val: i, selected: (i == 2)});
        }
        return partysizes;
    };

    Template.booking_box.rendered = function () {
        $('#datepicker').datepicker({weekStart:1});
    };


    Template.booking_box.events({
        'click .book_table': function (event, template) {
            //block the button
            //make a booking call

            var BookingDate = template.find("#datepicker").value;
            var BookingTime = template.find("#hour").value;
            var PartySize = template.find("#partySize").value;

            var bookingViewModel = {
                RestaurantId: 96753,
                bookingDate: BookingDate,
                bookingTime: BookingTime,
                partySize: PartySize
            };

            Meteor.call("searchAvailability", bookingViewModel, buildTimeSlots);
            return false;
        }
    });

    var buildTimeSlots = function(err,response){
        debugger;
        var availabilityObject = JSON.parse(response);

        var availabilityArray = availabilityObject.Available[0].RIDSet[0].Results;

        var exactTime = availabilityArray.filter( function(item){return (item.TimeOffsetMinutes==0);} );
        var beforeTimes = availabilityArray.filter( function(item){return (item.TimeOffsetMinutes<0);});
        beforeTimes = beforeTimes.slice(beforeTimes.length-2,beforeTimes.length); //get last 2 elements
        var afterTimes = availabilityArray.filter( function(item){return (item.TimeOffsetMinutes>0);}).slice(0,2); //get first two elements

        var timeslots = ["--","--","--","--","--"];
        var searchTime = new Date(2013, 10, 27, 19, 0);

        timeslots[0] = {text: new Date(searchTime.getTime() + beforeTimes[0].TimeOffsetMinutes*60000).toLocaleTimeString(), val: new Date(searchTime.getTime() + beforeTimes[0].TimeOffsetMinutes*60000)};//searchTime.setMinutes(searchTime.getMinutes() + beforeTimes[0].TimeOffsetMinutes);
        timeslots[1] = {text: new Date(searchTime.getTime() + beforeTimes[1].TimeOffsetMinutes*60000).toLocaleTimeString(), val: new Date(searchTime.getTime() + beforeTimes[1].TimeOffsetMinutes*60000)};//searchTime.setMinutes(searchTime.getMinutes() + beforeTimes[1].TimeOffsetMinutes);
        timeslots[2] = {text: new Date(searchTime.getTime() + exactTime[0].TimeOffsetMinutes*60000).toLocaleTimeString(), val: new Date(searchTime.getTime() + exactTime[0].TimeOffsetMinutes*60000)};//searchTime.setMinutes(searchTime.getMinutes() + exactTime[0].TimeOffsetMinutes);
        timeslots[3] = {text: new Date(searchTime.getTime() + afterTimes[0].TimeOffsetMinutes*60000).toLocaleTimeString(), val: new Date(searchTime.getTime() + afterTimes[0].TimeOffsetMinutes*60000)};//searchTime.setMinutes(searchTime.getMinutes() + afterTimes[0].TimeOffsetMinutes);
        timeslots[4] = {text: new Date(searchTime.getTime() + afterTimes[1].TimeOffsetMinutes*60000).toLocaleTimeString(), val: new Date(searchTime.getTime() + afterTimes[1].TimeOffsetMinutes*60000)};//searchTime.setMinutes(searchTime.getMinutes() + afterTimes[1].TimeOffsetMinutes);

        Session.set('timeSlots', timeslots);
        Session.set('showTimeSlots', true);
    }
