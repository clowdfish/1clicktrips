(function() {

  'use strict';

  angular
    .module('app.search', [
      'app.mockdata',
      'ngMockE2E',
      'ui.bootstrap',
      'ui.bootstrap.tpls',
      'app.search.timepicker',
      'pascalprecht.translate'
    ])
    .run(run)
    .constant('SUGGESTION_TYPES', {
      address: 'Address',
      events: 'Event',
      meetingSpace: 'Meeting Space'
    })
    .config(decorateDatePicker)
    .config(decoratePopupDatePicker)
    .config(interpolateConfig);

  function interpolateConfig($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }

  function run($httpBackend, mockEvents, mockAddress) {
    //passThrough for google api request
    $httpBackend.whenGET(/^https:\/\/maps.googleapis.com\/maps\/api\//).passThrough();
    $httpBackend.whenGET(/^scripts\/app\/templates\//).passThrough();
    $httpBackend.whenGET(/^\/api\/search\/events/).passThrough();
    $httpBackend.whenGET(/^\/api\/search\/spaces/).passThrough();
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