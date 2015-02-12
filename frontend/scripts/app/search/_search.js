(function() {

  'use strict';

  angular
    .module('app.search', [
      'app.mockdata',
      'ngMockE2E',
      'ui.bootstrap',
      'ui.bootstrap.tpls',
      'app.search.timepicker'
    ])
    .run(run)
    .constant('SUGGESTION_TYPES', {
      address: 'Address',
      events: 'Event',
      meetingSpace: 'Meeting Space'
    })
    .config(decorateDatePicker)
    .config(decoratePopupDatePicker);

  function run($httpBackend, mockEvents) {
    //passThrough for google api request
    $httpBackend.whenGET(/^https:\/\/maps.googleapis.com\/maps\/api\//).passThrough();
    $httpBackend.whenGET(/^scripts\/app\/templates\//).passThrough();
    $httpBackend.whenGET(/^\/suggestion\/event\//).respond(mockEvents);
    $httpBackend.whenGET(/^\/suggestion\/meeting_space\//).respond(mockEvents);
  }

  function decorateDatePicker($provide) {
    $provide.decorator('daypickerDirective', function($delegate) {
      var directive = $delegate[0];
      directive.templateUrl = 'scripts/app/templates/search/datepicker/day.html'
      return $delegate;
    });
  }

  function decoratePopupDatePicker($provide) {
    $provide.decorator('datepickerPopupWrapDirective', function($delegate) {
      var directive = $delegate[0];
      directive.templateUrl = 'scripts/app/templates/search/datepicker/popup.html';
      return $delegate;
    });
  }

})();