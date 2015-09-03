(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchOriginCtrl', searchOriginCtrl);

	function searchOriginCtrl($scope,
                            suggestionAdapter,
                            googleMap) {

		$scope.getAddressSuggestion = getAddressSuggestion;
    $scope.selectOriginSuggestion = selectOriginSuggestion;

    $scope.$watch('origin', function(origin) {
      if (_.isEmpty(origin)) {
        setOrigin(null);
      }
    });

    /**
     *
     *
     * @param options
     */
    function setOrigin(options) {

      if(options == null) {
        $scope.$parent.schedule.originAddress = null;
        $scope.$parent.schedule.origin = null;
      }
      else {
        $scope.$parent.schedule.originAddress = options.address;
        $scope.$parent.schedule.origin = options.location;
      }
    }

    /**
     * Get suggestion for address
     * @param {string} val - input
     * @return {promise} - return a promise for typeahead
    */
    function getAddressSuggestion(val) {
      return suggestionAdapter.getAddressSuggestion(val);
    }

    /**
     *
     *
     * @param $item
     */
    function selectOriginSuggestion($item) {
      googleMap
      	.geocode($item.description)
      	.then(function(location) {

          setOrigin({
            address: $scope.origin,
            location: location
          });

          focusOnDestinationField();
      	}, function() {
          setOrigin(null);
      	});
    }

    /**
     *
     */
    function focusOnDestinationField() {
      //$('#destination').focus();
    }
	}
})();
