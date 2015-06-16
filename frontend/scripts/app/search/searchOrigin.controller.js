(function() {

	'use strict';

	angular
		.module('app.search')
		.controller('searchOriginCtrl', searchOriginCtrl);

	function searchOriginCtrl ($scope,
                            $state,
                            SUGGESTION_TYPES,
                            AUTH_EVENTS,
                            suggestionAdapter,
                            googleMap,
                            defaultOriginApi) {

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

    /**
    * Get default origin
    */
    $scope.storeDefaultOrigin = false;
    $scope.toggleDefaultOrigin = toggleDefaultOrigin;
    $scope.loadDefaultOrigin = loadDefaultOrigin;

    // load default origin on initialization
    loadDefaultOrigin();

    // reload default origin location on successful sign up
    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
      loadDefaultOrigin();
    });

    $scope.$watch('origin', function(origin) {
      if (_.isEmpty(origin)) {
        $scope.setOrigin(null);
      }
    });

    $scope.$on('selectFavorite', function(e, favorite) {
      $scope.setOrigin({
        description: favorite.origin.description,
        location: favorite.origin.location
      });
      $scope.origin = favorite.origin.description;
      $scope.originLocation = favorite.origin.location
    });

    function loadDefaultOrigin() {
      if ($state.current.name === 'refineSearch') {
        return;
      }

      defaultOriginApi
        .getDefaultOrigin()
        .then(function(defaultOrigin) {

          if (defaultOrigin === null) { return; }

          if (false === _.isEmpty(defaultOrigin)) {
            $scope.origin = defaultOrigin.description;
            $scope.originLocation = defaultOrigin.location;
            $scope.setOrigin(defaultOrigin);
            $scope.storeDefaultOrigin = true;
          }
        });
    }

    function toggleDefaultOrigin() {
      if ($scope.storeDefaultOrigin) {
        if ($scope.origin === null) {
          alert("Please enter your origin location");
          $scope.storeDefaultOrigin = false;
        }
        else {
          defaultOriginApi
            .setDefaultOrigin($scope.origin, $scope.originLocation);
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
          $scope.originLocation = location;
          if ($scope.storeDefaultOrigin) {
            defaultOriginApi
              .setDefaultOrigin($scope.origin, $scope.originLocation);
          }
          $scope.setOrigin({
            description: $scope.origin,
            location: location
          });
      	}, function() {
          $scope.setOrigin(null);
      	});
    }
	}
})();
