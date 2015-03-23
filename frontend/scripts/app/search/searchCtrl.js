(function() {

  'use strict';

  angular
    .module('app.search')
    .controller('searchCtrl', searchCtrl);

  function searchCtrl($scope,
                      $timeout,
                      searchFormData) {

    var favoriteOriginLocation = null;
    $scope.isLogin = true;

    // indicate step data finish
    $scope.isStep1Ready = false;
    $scope.isStep2Ready = false;
    $scope.isStep3Ready = false;

    // trip destination
    $scope.destination = null;

    // trip origin
    $scope.origin = null;

    // active step
    $scope.step = 1;

    //Select step functions
    $scope.step1 = step1;
    $scope.step2 = step2;
    $scope.step3 = step3;

    //Search data
    $scope.destinationLocation = searchFormData.destinationLocation;
    $scope.originLocation = null;
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
      if ($scope.originLocation != null || $scope.origin != null) {
        $scope.isStep3Ready = true;
      }
    });

    $scope.$watchGroup(['startDate', 'endDate'], function() {
      if ($scope.startDate != null && $scope.endDate != null) {
        //$scope.isStep2Ready = true;
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
      $scope.destination = favorite.destination.description;
      $scope.destinationLocation = favorite.destination.location;
      $scope.isStep1Ready = true;

      $scope.origin = favorite.origin.description;
      favoriteOriginLocation = favorite.origin.location;
      $scope.isStep3Ready = true;

      step2();
    }

    function step1() {
      $scope.step = 1;
    }

    function step2() {
      if (!$scope.isStep1Ready || $scope.destinationLocation == null) {
        return;
      }

      $scope.step = 2;
      $scope.isStep2Ready = true;
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
