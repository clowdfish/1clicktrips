(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchOriginCtrl', searchOriginCtrl);

	function searchOriginCtrl ($scope, $q, $state, SUGGESTION_TYPES, suggestionAdapter, googleMap) {

		$scope.getAddressSuggestion = getAddressSuggestion;

    $scope.selectOriginSuggestion = selectOriginSuggestion;

    $scope.startSearch = startSearch;

		/**
    * Get suggestion for address only
    * @param {string} val - input
    * @return {promise} - return a promise for typeahead
    */
    function getAddressSuggestion(val) {
      return  suggestionAdapter
                .getSuggestion(val, SUGGESTION_TYPES.address);

    }

    function selectOriginSuggestion($item) {
      googleMap
      	.geocode($item.description)
      	.then(function(location) {
      		$scope.$parent.originAddress = location;
      		$scope.$parent.isStep3Ready = true;
      	}, function() {
					$scope.$parent.isStep3Ready = false;
      	});
    }

    /**
     * Send search parameter to result page
     */
    function startSearch() {
      var startDate = createDateFromDateAndTime($scope.$parent.startDate, $scope.$parent.startTime);
      var endDate = createDateFromDateAndTime($scope.$parent.endDate, $scope.$parent.endTime);
      $state.go('search_result', {
        originLatitude: $scope.$parent.originAddress.latitude,
        originLongitude: $scope.$parent.originAddress.longitude,
        destinationLatitude: $scope.$parent.destinationAddress.latitude,
        destinationLongitude: $scope.$parent.destinationAddress.longitude,
        startDate: startDate,
        endDate: endDate
      });

      function createDateFromDateAndTime(date, time) {
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
      }
    }

	}
})();
