(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchOriginCtrl', searchOriginCtrl);

	function searchOriginCtrl ($scope, SUGGESTION_TYPES, suggestionAdapter, googleMap) {

		$scope.getAddressSuggestion = getAddressSuggestion;
    $scope.selectOriginSuggestion = selectOriginSuggestion;

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
      		$scope.$parent.originLocation = location;
      		$scope.$parent.isStepOriginReady = true;
      	}, function() {
					$scope.$parent.isStepOriginReady = false;
      	});
    }
	}
})();
