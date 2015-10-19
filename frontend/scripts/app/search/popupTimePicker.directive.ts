/// <reference path="../../_all.ts" />

module Search {

  'use strict';

  export function popupTimePickerWrapper() {
    return {
      restrict: 'EA',
      templateUrl: 'scripts/app/templates/search/popup-time-picker.html',
      replace: true
    }
  }

  export function popupTimePicker($compile) {
    return {
      restrict: 'EA',
      scope: {
        time: '=',
        isOpen: '=',
        onClick: '&'
      },
      link: link
    }

    function link(scope, element, attrs) {

      scope.hstep = 1;
      scope.mstep = 1;
      scope.ismeridian = false;
      scope.changed = changed;
      scope.showSpinners = true;

      var $element = $(element);
      
      var wrapperEl = angular.element('<div popup-time-picker-wrapper><timepicker></timepicker></div>');

      var $wrapperEl = $compile(wrapperEl)(scope);
      wrapperEl.remove();
      element.after($wrapperEl);

      wrapperEl.css({
        position: 'absolute',
        left: $element.position().left,
        top: $element.position().top + $element.height()
      });

      scope.$watch('isOpen', () => {
        if (scope.isOpen) {
          wrapperEl.show();
        } else {
          wrapperEl.hide();
        }
      });

      scope.$watch('time', () => {
        changed();
      });

      function changed() {
        var timeMoment = moment(scope.time);
        if (timeMoment && timeMoment.isValid()) {
          var timeString = timeMoment.format('HH:mm');
          $element.val(timeString);
        }
      }
    }
  }
}