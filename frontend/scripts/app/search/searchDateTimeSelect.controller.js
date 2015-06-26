(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchDateTimeSelectCtrl', searchDateTimeSelectCtrl);

	function searchDateTimeSelectCtrl ($scope, $timeout) {
    console.log('Initial searchDateTimeSelectCtrl');
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

    $scope.onTimeStartKeydown = onTimeStartKeydown;
    $scope.onTimeEndKeydown = onTimeEndKeydown;

    $scope.updateStartDate = function() {

      $scope.startTimeInvalid = !new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
        .test($scope.startTimeString);

      if(!$scope.startTimeInvalid) {
        $scope.setStartDate({
          startDate: $scope.startDate,
          startTime: $scope.startTimeString
        });
        return true;
      }
      return false;
    };

    $scope.updateEndDate = function() {
      $scope.endTimeInvalid = !new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
        .test($scope.endTimeString);

      if (!$scope.endTimeInvalid) {
        $scope.setEndDate({
          endDate: $scope.endDate,
          endTime: $scope.endTimeString
        });
        return true;
      }
      return false;
    };

    $scope.$watch('startDate', function(newValue, oldValue) {
      $scope.updateStartDate();
      if ($scope.startDate > $scope.endDate) {
        var endDate = new Date();
        endDate.setDate($scope.startDate.getDate());
        endDate.setMonth($scope.startDate.getMonth());
        endDate.setYear($scope.startDate.getFullYear());
        $scope.endDate = endDate;
      }
    });

    $scope.$watch('endDate', function() {
      $scope.updateEndDate();
      if ($scope.isOpenEndDatePicker) {
        focusOnEndTime();
      }
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

    $scope.$on('selectFavorite', function(e, favorite) {
      openStartDatePicker();
    });

    $scope.$on('openStartDatePicker', function() {
      openStartDatePicker();
    });

    function openStartDatePicker() {
      $('#date_start').focus();
      $timeout(function() {
        $scope.isOpenStartDatePicker = true;
      }, 0);
    }

    function openEndDatePicker() {
      $('#date_end').focus();
      $timeout(function() {
        $scope.isOpenEndDatePicker = true;
      }, 0);
    }

    function focusOnStartTime() {
      $('#time_start').focus();
    }

    function focusOnEndTime() {
      $('#time_end').focus();
    }

    function focusOnSearchButton() {
      $('.search-form-input-item-button').focus();
    }

    function onTimeStartKeydown($event) {
      if ($event.keyCode === 13) {
        if (false === $scope.updateStartDate()) {
          return;
        }
        openEndDatePicker();
        return false;
      }
    }

    function onTimeEndKeydown($event) {
      if ($event.keyCode === 13) {
        if (false === $scope.updateEndDate()) {
          return;
        }

        focusOnSearchButton();
        return false;
      }
    }
	}
})();
