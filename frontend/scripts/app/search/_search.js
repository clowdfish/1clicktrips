(function() {

  'use strict';

  angular
    .module('app.search', [
      'app.mockdata',
      'ui.bootstrap',
      'ui.bootstrap.tpls',
      'app.search.timepicker'
    ])
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