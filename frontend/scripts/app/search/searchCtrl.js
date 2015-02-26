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

    $scope.$watchGroup(['startDate', 'startTime', 'endDate', 'endTime'], function() {
      if ($scope.startDate != null &&
        $scope.endDate != null &&
        $scope.startTime != null && 
        $scope.endTime != null) {
        $scope.isStep2Ready = true;
      }
    });

    //User select favorite event
    $scope.$on('selectFavorite', function(e, favorite) {
      selectFavorite(favorite);
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
      if ($scope.destinationAddress == null) {
        return;
      }
      $scope.step = 2; 
    }

    function step3() {
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