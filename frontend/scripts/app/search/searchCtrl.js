(function() {

  'use strict';

  angular
    .module('app.search')
    .controller('searchCtrl', searchCtrl);

  function searchCtrl($scope,
                      $state,
                      $q,
                      $timeout,
                      SUGGESTION_TYPES,
                      suggestionAdapter,
                      $document,
                      $location,
                      googleMap,
                      searchFormData
                      ) {

    var favoriteOriginLocation = null;
    $scope.isLogin = true;

    //indicate step data finish
    $scope.isStep1Ready = false;
    $scope.isStep2Ready = false;
    $scope.isStep3Ready = false;

    //Trip destination
    $scope.destination = null;

    //Trip origin
    $scope.origin = null;

    //Active step
    $scope.step = 1;

    //Select step functions
    $scope.step1 = step1;
    $scope.step2 = step2;
    $scope.step3 = step3;

    //Search data
    $scope.destinationLocation = searchFormData.destinationLocation;
    $scope.originLocation =  null;
    favoriteOriginLocation = searchFormData.originLocation != null ? searchFormData.originLocation : null;
    $scope.destination = searchFormData.destination;
    $scope.origin = searchFormData.origin;
    $scope.startDate = searchFormData.startDate;
    $scope.endDate = searchFormData.endDate;

    $scope.$watch('destinationLocation', function() {
      if ($scope.destinationLocation != null) {
        $scope.isStep1Ready = true;
      }
    });

    $scope.$watch('originLocation', function() {
      if ($scope.isStep1Ready &&
        $scope.isStep2Ready &&
        $scope.originLocation != null) {
        $scope.isStep3Ready = true;
      }
    });

    $scope.$watchGroup(['startDate', 'endDate'], function() {
      if ($scope.isStep1Ready == true &&
        $scope.startDate != null &&
        $scope.endDate != null) {
        $scope.isStep2Ready = true;
      }
    });

    $scope.$on('selectFavorite', function(e, data) {
      selectFavorite(data);
    });

    /**
    * Select favorite:
    * Back to step 1
    * Fill destination and show map
    * Assign origin value to favorite value
    */
    function selectFavorite(favorite) {
      step1();
      $scope.destination = favorite.destination.description;
      $scope.destinationLocation = favorite.destination.location;
      $scope.origin = favorite.origin.description;
      favoriteOriginLocation = favorite.origin.location;
    }

    function step1() {
      $scope.step = 1;
    }

    function step2() {
      if (!$scope.isStep1Ready || $scope.destinationLocation == null) {
        return;
      }
      $scope.step = 2;

      //Since default data for step2 is populated, so step 2 is already ready
      $scope.$parent.isStep2Ready = true;
    }

    function step3() {
      if (!$scope.isStep1Ready || !$scope.isStep2Ready) {
        return;
      }

      if ($scope.startDate == null ||
        $scope.endDate == null) {
        return;
      }

      $scope.step = 3;

      $timeout(function() {
        if ($scope.origin && favoriteOriginLocation) {
          $scope.originLocation = favoriteOriginLocation;
        }
      }, 50);
    }
  }
})();
