(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchStep3Ctrl', searchStep3Ctrl);

	function searchStep3Ctrl ($scope, $q, $state, SUGGESTION_TYPES, suggestionAdapter, googleMap) {
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
     * @todo implement
     */
    function startSearch() {
      $state.go('search_result', {
        originLatitude: 1,
        originLongitude: 1,
        destinationLatitude: 1,
        destinationLongitude: 1,
        startTime: 1,
        endTime: 1
      });
    }
	}
})();