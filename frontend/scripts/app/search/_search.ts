/// <reference path="../../_all.ts" />

module Search {

  'use strict';

  angular
    .module('app.search', [
      'app.core'
    ])
    .constant('DEFAULT_LOCATION', {
      longitude: 9.456449,
      latitude: 48.709067
    })
    .service('suggestionAdapter', SuggestionAdapter.Factory())
    .controller('searchCtrl', SearchCtrl)
    .directive('popupTimePicker', popupTimePicker)
    .directive('popupTimePickerWrapper', popupTimePickerWrapper)
    .directive('searchMap', searchMap)
    .config(decorateDatePicker)
    .config(decoratePopupDatePicker)
    .config(decorateTimePicker);

  function decorateDatePicker($provide) {
    $provide.decorator('daypickerDirective', function($delegate) {
      var directive = $delegate[0];
      directive.templateUrl = 'scripts/app/templates/search/datepicker/day.html';
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

  function decorateTimePicker($provide) {
    $provide.decorator('timepickerDirective', function($delegate) {
      var directive = $delegate[0];
      directive.templateUrl = 'scripts/app/templates/search/timepicker/time.html';
      return $delegate;
    });
  }
}