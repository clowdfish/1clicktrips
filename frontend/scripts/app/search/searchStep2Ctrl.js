(function() {

	'use strict';
	
	angular
		.module('app.search')
		.controller('searchStep2Ctrl', searchStep2Ctrl);

	function searchStep2Ctrl ($scope) {
		// configure date picker
		$scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 0
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.showWeeks = false;

    $scope.openStartDatePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      closeAll();
      $scope.isOpenStartDatePicker = true;
    };

    $scope.openEndDatePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      closeAll();
      $scope.isOpenEndDatePicker = true;
    };

    $scope.openStartTimePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      closeAll();
      $scope.isOpenStartTimePicker = true;
    };

    $scope.closeStartTimePicker = function($event) {
      $scope.isOpenStartTimePicker = false;
    };

    $scope.openEndTimePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      closeAll();
      $scope.isOpenEndTimePicker = true;
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
	}
})();