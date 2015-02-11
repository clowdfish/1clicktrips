(function() {

  'use strict';

  angular
    .module('app.search', [
      'app.mockdata',
      'ngMockE2E',
      'ui.bootstrap'
    ])
    .run(run)
    .constant('SUGGESTION_TYPES', {
      address: 'Address',
      events: 'Event',
      meetingSpace: 'Meeting Space'
    });

  function run($httpBackend, mockEvents) {
    //passThrough for google api request
    $httpBackend.whenGET(/^https:\/\/maps.googleapis.com\/maps\/api\//).passThrough();

    $httpBackend.whenGET(/^\/suggestion\/event\//).respond(mockEvents);
    $httpBackend.whenGET(/^\/suggestion\/meeting_space\//).respond(mockEvents);
  }
})();