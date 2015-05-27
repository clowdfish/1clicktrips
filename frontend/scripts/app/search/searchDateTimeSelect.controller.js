(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchDateTimeSelectCtrl', searchDateTimeSelectCtrl);

	function searchDateTimeSelectCtrl ($scope) {
    /**
    * Initial data
    */
    $scope.startDate = $scope.$parent.startDate;
    $scope.startTimeString = $scope.$parent.startTimeString;
    $scope.endDate = $scope.$parent.endDate;
    $scope.endDateString = $scope.$parent.endDateString;
    $scope.now = new Date();
    /**
    * Date time picker open status
    */
    $scope.isOpenStartDatePicker = false;
    $scope.isOpenEndDatePicker = false;

		// configure date picker
		$scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 0
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.showWeeks = false;

    $scope.updateStartDate = function() {

      $scope.startTimeInvalid = !new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
        .test($scope.startTimeString);

      if(!$scope.startTimeInvalid)
        $scope.setStartDate({
          startDate: $scope.startDate,
          startTime: $scope.startTimeString
        });
    };

    $scope.updateEndDate = function() {

      $scope.endTimeInvalid = !new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
        .test($scope.endTimeString);

      if(!$scope.endTimeInvalid)
        $scope.setEndDate({
          endDate: $scope.endDate,
          endTime: $scope.endTimeString
        });
    };

    $scope.$watch('startDate', function() {
      $scope.updateStartDate();
      var endDate = new Date();
      endDate.setDate($scope.startDate.getDate());
      endDate.setMonth($scope.startDate.getMonth());
      endDate.setYear($scope.startDate.getFullYear());
      $scope.endDate = endDate;
    });

    $scope.$watch('endDate', function() {
      $scope.updateEndDate();
    });

    $scope.toggleStartDatePicker = function($event) {
      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }

      $scope.$parent.stepAppointment();
      $scope.isOpenEndDatePicker = false;
      $scope.isOpenStartDatePicker = !$scope.isOpenStartDatePicker;
    };

    $scope.toggleEndDatePicker = function($event) {
      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }

      $scope.$parent.stepAppointment();
      $scope.isOpenStartDatePicker = false;
      $scope.isOpenEndDatePicker = !$scope.isOpenEndDatePicker;
    };
	}
})();
