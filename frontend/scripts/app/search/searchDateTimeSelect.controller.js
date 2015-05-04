(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchDateTimeSelectCtrl', searchDateTimeSelectCtrl);

	function searchDateTimeSelectCtrl ($scope, $document) {
    /**
    * Date time picker open status
    */
    $scope.isOpenStartDatePicker = false;
    $scope.isOpenStartTimePicker = false;
    $scope.isOpenEndDatePicker = false;
    $scope.isOpenEndTimePicker = false;

    $scope.startTimeInvalid = false;
    $scope.endTimeInvalid = false;

		// configure date picker
		$scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 0
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.showWeeks = false;

    $scope.checkTimeFormat = function() {
      var startTime = $scope.$parent.startTimeString;
      var endTime = $scope.$parent.endTimeString;

      var regEx = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");

      $scope.startTimeInvalid = !regEx.test(startTime);
      $scope.endTimeInvalid = !regEx.test(endTime);

      // set date object in result controller
      if(!$scope.startTimeInvalid) {
        $scope.$parent.startDate.setHours(parseInt(startTime.substr(0, 2)));
        $scope.$parent.startDate.setMinutes(parseInt(startTime.substr(3, 2)));
        $scope.$parent.startDate.setSeconds(0);
      }

      if(!$scope.endTimeInvalid) {
        $scope.$parent.endDate.setHours(parseInt(endTime.substr(0, 2)));
        $scope.$parent.endDate.setMinutes(parseInt(endTime.substr(3, 2)));
        $scope.$parent.endDate.setSeconds(0);
      }
    };

    $scope.openStartDatePicker = function($event) {
      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }

      closeAll();
      $scope.isOpenStartDatePicker = true;
    };

    $scope.openEndDatePicker = function($event) {
      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }

      closeAll();
      $scope.isOpenEndDatePicker = true;
    };

    /**
     * Close all open date or time pickers
     */
    function closeAll() {
      $scope.isOpenStartDatePicker = false;
      $scope.isOpenStartTimePicker = false;
      $scope.isOpenEndDatePicker = false;
      $scope.isOpenEndTimePicker = false;
    }

    $scope.$watchGroup(['$parent.startDate', '$parent.endDate'], function() {

      if ($scope.$parent.startDate != null && $scope.$parent.endDate != null) {
        $scope.$parent.isStepAppointmentReady = true;
      }
    });
	}
})();
