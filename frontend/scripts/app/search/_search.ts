/// <reference path="../../_all.ts" />

module Search {

  'use strict';

  angular
    .module('app.search', [
      'app.core'
    ])
    .service('suggestionAdapter', SuggestionAdapter.Factory())
    .controller('searchCtrl', SearchCtrl)
    .config(decorateDatePicker)
    .config(decoratePopupDatePicker);

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
}