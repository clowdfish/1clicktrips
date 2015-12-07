/// <reference path="../_all.ts" />

module Search {

  'use strict';

  angular
    .module('app.search', [
      'app.core'
    ])
    .constant('DEFAULT_LOCATION', {
      latitude: 52.515107, //48.709067
      longitude: 13.389585 //9.456449
    })
    .service('suggestionAdapter', SuggestionAdapter.Factory())
    .controller('searchCtrl', SearchCtrl)
    .directive('popupTimePicker', popupTimePicker)
    .directive('popupTimePickerWrapper', popupTimePickerWrapper)
    .directive('searchMap', searchMap)
    .config(decorateDatePicker)
    .config(decoratePopupDatePicker)
    .config(decorateTimePicker)
    .config(routerConfig);

  function decorateDatePicker($provide) {
    $provide.decorator('uibDaypickerDirective', function($delegate) {
      var directive = $delegate[0];
      directive.templateUrl = 'app/templates/search/datepicker/day.html';
      return $delegate;
    });
  }

  function decoratePopupDatePicker($provide) {
    $provide.decorator('uibDatepickerPopupWrapDirective', function($delegate) {
      var directive = $delegate[0];
      directive.templateUrl = 'app/templates/search/datepicker/popup.html';
      return $delegate;
    });
  }

  function decorateTimePicker($provide) {
    $provide.decorator('uibTimepickerDirective', function($delegate) {
      var directive = $delegate[0];
      directive.templateUrl = 'app/templates/search/timepicker/time.html';
      return $delegate;
    });
  }
}