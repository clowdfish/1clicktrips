(function() {
  angular
    .module('app.search')
    .value('mockMeetingSpace', [
      {
        "id" : 1,
        "title" : "MeetNow Space",
        "description" : "An example meeting space",
        "location" : {
          "latitude" : 48.709008,
          "longitude" : 9.457281
        },
        "seatsAvailable" : 20,
        "catering" : false
      },
      {
        "id" : 2,
        "title" : "MeetNow Space",
        "description" : "An example meeting space",
        "location" : {
          "latitude" : 48.709008,
          "longitude" : 9.457281
        },
        "seatsAvailable" : 20,
        "catering" : false
      },
      {
        "id" : 3,
        "title" : "MeetNow Space",
        "description" : "An example meeting space",
        "location" : {
          "latitude" : 48.709008,
          "longitude" : 9.457281
        },
        "seatsAvailable" : 20,
        "catering" : false
      }
    ]);
})();