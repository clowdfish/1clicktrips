(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchOriginCtrl', searchOriginCtrl);

	function searchOriginCtrl ($scope, SUGGESTION_TYPES, AUTH_EVENTS, suggestionAdapter, googleMap, defaultOriginApi) {

		$scope.getAddressSuggestion = getAddressSuggestion;
    $scope.selectOriginSuggestion = selectOriginSuggestion;

    /**
    * Get default origin
    */
    $scope.storeDefaultOrigin = false;
    $scope.toggleDefaultOrigin = toggleDefaultOrigin;

    // load default origin on initialization
    loadDefaultOrigin();

    // reload default origin location on successful sign up
    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
      loadDefaultOrigin();
    });

    function loadDefaultOrigin() {

      defaultOriginApi
        .getDefaultOrigin()
        .then(function(defaultOrigin) {
          if (defaultOrigin == null) { return; }

          if ($scope.$parent.origin == null || $scope.$parent.origin.trim() === '') {
            $scope.$parent.origin = defaultOrigin.description;
            $scope.$parent.originLocation = defaultOrigin.location;
            $scope.storeDefaultOrigin = true;
            $scope.$parent.isStepOriginReady = true;
          }
        });
    }

    function toggleDefaultOrigin() {
      if ($scope.storeDefaultOrigin) {
        if ($scope.$parent.origin == null) {
          alert("Please enter your origin location");
          $scope.storeDefaultOrigin = false;
        }
        else {
          defaultOriginApi
            .setDefaultOrigin($scope.$parent.origin, $scope.$parent.originLocation);
        }
      } else {
        defaultOriginApi
          .setDefaultOrigin(null);
      }
    }

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
