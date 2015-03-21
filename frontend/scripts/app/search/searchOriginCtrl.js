(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchOriginCtrl', searchOriginCtrl);

	function searchOriginCtrl ($scope, $state, SUGGESTION_TYPES, suggestionAdapter, googleMap) {

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
      		$scope.$parent.originLocation = location;
      		$scope.$parent.isStep3Ready = true;
      	}, function() {
					$scope.$parent.isStep3Ready = false;
      	});
    }

    /**
     * Send search parameter to result page
     */
    function startSearch() {
      if (false == $scope.$parent.isStep3Ready) {
        return;
      }
      var startDate = formatDate($scope.$parent.startDate);
      var endDate = formatDate($scope.$parent.endDate);
      var requestParameters = {
        originLatitude: $scope.$parent.originLocation.latitude,
        originLongitude: $scope.$parent.originLocation.longitude,
        origin: $scope.$parent.origin,
        destinationLatitude: $scope.$parent.destinationLocation.latitude,
        destinationLongitude: $scope.$parent.destinationLocation.longitude,
        destination: $scope.$parent.destination,
        startDate: startDate,
        endDate: endDate
      };
      $state.go('search_result', requestParameters);
    }

    function formatDate(date) {
      return moment(date).format('YYYY-MM-DDTHH:mm:ss');
    }

	}
})();
