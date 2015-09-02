(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchOriginCtrl', searchOriginCtrl);

	function searchOriginCtrl($scope,
                            suggestionAdapter,
                            googleMap) {

    /**
    * Initial data
    */
    $scope.origin = $scope.$parent.origin;
    $scope.originLocation = $scope.$parent.originLocation;
    $scope.setOrigin({
      description: $scope.origin,
      location: $scope.originLocation
    });

		$scope.getAddressSuggestion = getAddressSuggestion;
    $scope.selectOriginSuggestion = selectOriginSuggestion;

    $scope.$watch('origin', function(origin) {
      if (_.isEmpty(origin)) {
        $scope.setOrigin(null);
      }
    });


    /**
     * Get suggestion for address
     * @param {string} val - input
     * @return {promise} - return a promise for typeahead
    */
    function getAddressSuggestion(val) {
      return suggestionAdapter.getAddressSuggestion(val);
    }

    function selectOriginSuggestion($item) {
      googleMap
      	.geocode($item.description)
      	.then(function(location) {
          $scope.originLocation = location;

          $scope.setOrigin({
            description: $scope.origin,
            location: location
          });
          focusOnDestinationField();
      	}, function() {
          $scope.setOrigin(null);
      	});
    }

    //Focus on destination field
    function focusOnDestinationField() {
      $('#destination').focus();
    }
	}
})();
