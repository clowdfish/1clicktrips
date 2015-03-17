// mocking/searchController.js

var Promise = require('es6-promise').Promise;
var Config = require('../../config/general');
var SearchEngine = require('ttg-search');
var SearchApi = SearchEngine.SearchApi;

// handle different timezones?
var disableTimezones = true;
var searchApi = new SearchApi(disableTimezones, Config.logLocation);

module.exports = {

  getEvents: function(filter, limit) {

    console.log("Retrieving events. Limit=" + limit);

    return new Promise(function(resolve, reject) {

      var eventsArray = [];
      for(var i=0; i<limit; i++) {
        eventsArray.push(createMockEvent(i+1));
      }

      resolve(eventsArray);
    });
  },

  getMeetingSpaces: function(filter, limit) {

    console.log("Retrieving meeting spaces. Limit=" + limit);

    return new Promise(function(resolve) {

      var meetingSpacesArray = [];
      for(var i=0; i<limit; i++) {
        meetingSpacesArray.push(createMockMeetingSpace(i+1));
      }

      resolve(meetingSpacesArray);
    });
  },

  getTripAlternatives: function(tripId, segmentId, limit) {

    console.log("Retrieving trip alternatives.");

    return new Promise(function(resolve) {

      var alternativesArray = [];

      alternativesArray.push(createMockAlternative(1));
      alternativesArray.push(createMockAlternative(2));

      resolve(alternativesArray);
    });
  },

  getTripResults: function(searchObject, userLicence) {

    console.log("Retrieving trip results.");

    return new Promise(function(resolve, reject) {
      // resolve(createMockTripResult());
      // return;
      // example API request
      searchApi.search(searchObject, 0, userLicence)
        .then(function(itineraries) {

         resolve(itineraries);
        })
        .catch(function(error) {

          reject(error);
        });

      //resolve(createMockTripResult());
    });
  }
};

// ==========================================================================
// MOCKING OBJECT CREATORS ==================================================
// ==========================================================================

function createMockEvent(id) {
  return {
    "id" : id,
    "title" : "World Event Las Vegas",
    "description" : "An example event",
    "location" : {
      "latitude" : 36.161805,
      "longitude" : -115.141183
    },
    "tags" : [
      "test", "another tag", "cool"
    ],
    "dates" : [
      {
        "start" : "2015-02-09T02:54:51+00:0",
        "end" : "2015-02-15T09:54:51+00:0"
      }
    ],
    "open": true,
    "url" : "http://whatever.com",
    "image" : "http://placehold.it/150x150"
  }
}

function createMockMeetingSpace(id) {
  return {
    "id" : id,
    "title" : "MeetNow Space",
    "description" : "An example meeting space",
    "location" : {
      "latitude" : 48.709008,
      "longitude" : 9.457281
    },
    "seatsAvailable" : 20,
    "catering" : false
  }
}

function createMockAlternative(id) {

  // TODO implement

  return {
    "id" : id
  }
}

function createMockTripResult() {
  return [[{"outbound":{"origin":{"description":"Origin","location":{"latitude":40.71278,"longitude":-74.00594}},"destination":{"description":"Destination","location":{"latitude":32.71574,"longitude":-117.1611}},"departureTime":0,"arrivalTime":0,"distance":3956.76,"duration":440,"segments":[{"start":{"description":"Origin","location":{"latitude":40.71278,"longitude":-74.00594}},"end":{"description":"Fulton St","location":{"latitude":40.7102,"longitude":-74.00769}},"departureTime":0,"arrivalTime":0,"duration":6,"distance":0.5,"path":"}unwFbhubMc@cBb@{AfAMpAhF`Ag@tE|GrAhA","type":1,"price":{"amount":0,"currency":"EUR"}},{"start":{"description":"Fulton St","location":{"latitude":40.7102,"longitude":-74.00769}},"end":{"description":"Howard Beach – JFK Airport","location":{"latitude":40.66045,"longitude":-73.83031}},"departureTime":0,"arrivalTime":0,"duration":33,"distance":17.84,"path":"wenwF~rubMzbAgjBvj@{R`WuMhq@awEr^ohNmIck@oMyd@sEs}AdkAg|@no@oV","type":8,"price":{"amount":5,"currency":"USD"}},{"start":{"description":"Howard Beach – JFK Airport","location":{"latitude":40.66045,"longitude":-73.83031}},"end":{"description":"New York JFK","location":{"latitude":40.64441,"longitude":-73.78275}},"departureTime":0,"arrivalTime":0,"duration":10,"distance":4.42,"path":"yndwFl~raMyGwa@lK}cCfaBawA","type":8,"price":{"amount":3,"currency":"USD"}},{"start":{"description":"New York JFK","location":{"latitude":40.64441,"longitude":-73.78275}},"end":{"description":"San Diego","location":{"latitude":32.73198,"longitude":-117.1974}},"departureTime":0,"arrivalTime":0,"duration":373,"distance":3928.21,"path":"","type":16,"price":{"amount":280,"currency":"USD"}},{"start":{"description":"San Diego","location":{"latitude":32.73198,"longitude":-117.1974}},"end":{"description":"Broadway & 4th Ave","location":{"latitude":32.71579,"longitude":-117.1609}},"departureTime":0,"arrivalTime":0,"duration":18,"distance":5.77,"path":"y~wfEfeijUxCbHtHwERsQvAF`@{XmDRlDSrAsd@rFg[AwVnDwJrIsGdG{@tp@?Mw]S~@R_A@_l@Sc@","type":4,"price":{"amount":2,"currency":"USD"}},{"start":{"description":"Broadway & 4th Ave","location":{"latitude":32.71579,"longitude":-117.1609}},"end":{"description":"Destination","location":{"latitude":32.71574,"longitude":-117.1611}},"departureTime":0,"arrivalTime":0,"duration":0,"distance":0.02,"path":"uxtfEr~ajUHb@","type":1,"price":{"amount":0,"currency":"EUR"}}]},"price":290,"currency":"EUR","type":0},{"outbound":{"origin":{"description":"Origin","location":{"latitude":40.71278,"longitude":-74.00594}},"destination":{"description":"Destination","location":{"latitude":32.71574,"longitude":-117.1611}},"departureTime":0,"arrivalTime":0,"distance":3928.1200000000003,"duration":433,"segments":[{"start":{"description":"Origin","location":{"latitude":40.71278,"longitude":-74.00594}},"end":{"description":"Park Pl","location":{"latitude":40.71305,"longitude":-74.00881}},"departureTime":0,"arrivalTime":0,"duration":4,"distance":0.36,"path":"}unwFbhubMaAQaBrDxExDiB~E","type":1,"price":{"amount":0,"currency":"EUR"}},{"start":{"description":"Park Pl","location":{"latitude":40.71305,"longitude":-74.00881}},"end":{"description":"New York Penn Station","location":{"latitude":40.75005,"longitude":-73.99236}},"departureTime":0,"arrivalTime":0,"duration":7,"distance":4.47,"path":"qwnwF~yubMeNzAujCuw@mmAcx@","type":8,"price":{"amount":2,"currency":"USD"}},{"start":{"description":"New York Penn Station","location":{"latitude":40.75005,"longitude":-73.99236}},"end":{"description":"Newark Liberty Airport Station","location":{"latitude":40.70396,"longitude":-74.19022}},"departureTime":0,"arrivalTime":0,"duration":23,"distance":20.68,"path":"y~uwFfsrbMkQdBaWbi@izA|fGeC|z@hcAjwCnYv{@}Dbh@pa@bg@zX|iA~XnMnFp`DpThjBn_@fu@fyDpbD","type":8,"price":{"amount":0,"currency":"EUR"}},{"start":{"description":"Newark Liberty Airport Station","location":{"latitude":40.70396,"longitude":-74.19022}},"end":{"description":"Newark","location":{"latitude":40.68987,"longitude":-74.17821}},"departureTime":0,"arrivalTime":0,"duration":5,"distance":2.04,"path":"w~lwFzgycMfl@sq@tCi[|_@mD","type":8,"price":{"amount":6,"currency":"USD"}},{"start":{"description":"Newark","location":{"latitude":40.68987,"longitude":-74.17821}},"end":{"description":"San Diego","location":{"latitude":32.73198,"longitude":-117.1974}},"departureTime":0,"arrivalTime":0,"duration":376,"distance":3894.78,"path":"","type":16,"price":{"amount":280,"currency":"USD"}},{"start":{"description":"San Diego","location":{"latitude":32.73198,"longitude":-117.1974}},"end":{"description":"Broadway & 4th Ave","location":{"latitude":32.71579,"longitude":-117.1609}},"departureTime":0,"arrivalTime":0,"duration":18,"distance":5.77,"path":"y~wfEfeijUxCbHtHwERsQvAF`@{XmDRlDSrAsd@rFg[AwVnDwJrIsGdG{@tp@?Mw]S~@R_A@_l@Sc@","type":4,"price":{"amount":2,"currency":"USD"}},{"start":{"description":"Broadway & 4th Ave","location":{"latitude":32.71579,"longitude":-117.1609}},"end":{"description":"Destination","location":{"latitude":32.71574,"longitude":-117.1611}},"departureTime":0,"arrivalTime":0,"duration":0,"distance":0.02,"path":"uxtfEr~ajUHb@","type":1,"price":{"amount":0,"currency":"EUR"}}]},"price":290,"currency":"EUR","type":1}]];
}
