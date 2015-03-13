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
                      googleMap
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
    $scope.destinationAddress = null;
    $scope.originAddress = null;

    $scope.startDate = new Date();
    $scope.startTime = new Date();
    $scope.startTime.setHours(14); //Default start time is 2pm
    $scope.endDate = new Date();
    $scope.endTime = new Date();
    $scope.endTime.setHours(16); //Default end time is 2pm

    $scope.$watch('destinationAddress', function() {
      if ($scope.destinationAddress != null) {
        $scope.isStep1Ready = true;
      }
    });

    $scope.$watch('originAddress', function() {
      if ($scope.isStep1Ready &&
        $scope.isStep2Ready &&
        $scope.originAddress != null) {
        $scope.isStep3Ready = true;
      }
    });

    $scope.$watchGroup(['startDate', 'startTime', 'endDate', 'endTime'], function() {
      if ($scope.isStep1Ready == true &&
        $scope.startDate != null &&
        $scope.endDate != null &&
        $scope.startTime != null &&
        $scope.endTime != null) {
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
      $scope.destinationAddress = favorite.destination.location;
      $scope.origin = favorite.origin.description;
      favoriteOriginLocation = favorite.origin.location;
    }

    function step1() {
      $scope.step = 1;
    }

    function step2() {
      if (!$scope.isStep1Ready || $scope.destinationAddress == null) {
        return;
      }
      $scope.step = 2;
    }

    function step3() {
      if (!$scope.isStep1Ready || !$scope.isStep2Ready) {
        return;
      }

      if ($scope.startDate == null ||
        $scope.endDate == null ||
        $scope.startTime == null ||
        $scope.endTime == null) {
        return;
      }

      $scope.step = 3;

      $timeout(function() {
        if ($scope.origin && favoriteOriginLocation) {
          $scope.originAddress = favoriteOriginLocation;
        }
      }, 50);
    }
  }
})();
