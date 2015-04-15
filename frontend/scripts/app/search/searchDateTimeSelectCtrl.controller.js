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

		// configure date picker
		$scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 0
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.showWeeks = false;
    $scope.now = new Date();

    $scope.changeToStep3 = function() {
      var canChangeStep = true;
      var now = new Date();

      if ($scope.$parent.startDate > $scope.$parent.endDate) {
        alert('End Date must larger than Start Date');
        canChangeStep = false;
      }

      if ($scope.$parent.startDate < now || $scope.$parent.endDate < now) {
        alert('Can not choose date and time in the past');
        canChangeStep = false;
      }

      if (canChangeStep) {
        $scope.$parent.step3();
      }

    }


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

    $scope.openStartTimePicker = function($event) {
      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }

      $scope.isOpenStartDatePicker = false;
      $scope.isOpenEndDatePicker = false;
      $scope.isOpenEndTimePicker = false;
      $scope.isOpenStartTimePicker = $scope.isOpenStartTimePicker ? false : true;
    };

    $scope.closeStartTimePicker = function($event) {
      $scope.isOpenStartTimePicker = false;
    };

    $scope.openEndTimePicker = function($event) {
      console.log($scope.isOpenEndTimePicker);
      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }

      $scope.isOpenStartDatePicker = false;
      $scope.isOpenStartTimePicker = false;
      $scope.isOpenEndDatePicker = false;
      $scope.isOpenEndTimePicker = $scope.isOpenEndTimePicker ? false : true;
    };

    $scope.closeEndTimePicker = function($event) {
      $scope.isOpenEndTimePicker = false;
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
      if (
        !$scope.$parent.isStep1Ready ||
        $scope.$parent.startDate == null ||
        $scope.$parent.endDate == null) {
        return;
      }

      $scope.$parent.isStep2Ready = true;
    });

	}
})();
