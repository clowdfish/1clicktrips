(function() {

  'use strict';

  angular
    .module('app.search')
    .controller('searchCtrl', searchCtrl);

  function searchCtrl($scope,
                      $timeout,
                      $state,
                      searchFormData,
                      SEARCH_STEPS) {

    var favoriteOriginLocation = null;
    $scope.isLogin = true;
    $scope.searchDataComplete = false;

    // trip destination
    $scope.destination = null;

    // trip origin
    $scope.origin = null;

    // active step
    $scope.step = SEARCH_STEPS.origin;

    // select step functions
    $scope.stepOrigin = stepOrigin;
    $scope.stepDestination = stepDestination;
    $scope.stepAppointment = stepAppointment;

    $scope.startSearch = startSearch;

    // search data
    $scope.destinationLocation = searchFormData.destinationLocation;
    $scope.originLocation = searchFormData.originLocation;

    favoriteOriginLocation = searchFormData.originLocation ? searchFormData.originLocation : null;
    $scope.destination = searchFormData.destination;
    $scope.origin = searchFormData.origin;

    $scope.startDate = searchFormData.startDate;
    $scope.startDate.setHours(10);
    $scope.startDate.setMinutes(0);

    $scope.endDate = searchFormData.endDate;
    $scope.endDate.setHours(14);
    $scope.endDate.setMinutes(0);

    $scope.startTimeString = "10:00";
    $scope.endTimeString = "14:00";

    $scope.$on('selectFavorite', function(e, data) {
      selectFavorite(data);
    });

    /**
    * Select favorite
    */
    function selectFavorite(favorite) {
      $scope.origin = favorite.origin.description;
      favoriteOriginLocation = favorite.origin.location;
      $scope.isStepOriginReady = true;

      $scope.destination = favorite.destination.description;
      $scope.destinationLocation = favorite.destination.location;
      $scope.isStepDestinationReady = true;

      stepAppointment();
    }

    function stepOrigin() {
      $scope.step = SEARCH_STEPS.origin;

      $timeout(function() {
        if ($scope.origin && favoriteOriginLocation) {
          $scope.originLocation = favoriteOriginLocation;
        }
      }, 50);
    }

    function stepDestination() {
      $scope.step = SEARCH_STEPS.destination;
    }

    function stepAppointment() {
      $scope.step = SEARCH_STEPS.appointment;
    }

    $scope.$watchGroup(['origin', 'destination', 'startDate', 'endDate'], function() {

      if ($scope.origin != null && $scope.destination != null &&
          $scope.startDate != null && $scope.endDate != null) {

        $scope.searchDataComplete = true;
      }
    });

    /**
     * Send search parameter to result page
     */
    function startSearch() {

      if ($scope.origin == null || $scope.destination == null) {
        return;
      }

      if ($scope.startDate > $scope.endDate) {
        alert('End Date must larger than Start Date.');
        $scope.searchDataComplete = false;
      }

      var now = new Date();
      if ($scope.startDate < now || $scope.endDate < now) {
        alert('Can not choose date and time in the past.');
        $scope.searchDataComplete = false;
      }

      if($scope.searchDataComplete) {
        var startDate = formatDate($scope.startDate);
        var endDate = formatDate($scope.endDate);

        var requestParameters = {
          originLatitude: $scope.originLocation.latitude,
          originLongitude: $scope.originLocation.longitude,
          origin: $scope.origin,
          destinationLatitude: $scope.destinationLocation.latitude,
          destinationLongitude: $scope.destinationLocation.longitude,
          destination: $scope.destination,
          startDate: startDate,
          endDate: endDate
        };

        $state.go('search_result', requestParameters);
      }
    }

    function formatDate(date) {
      return moment(date).format('YYYY-MM-DDTHH:mm:ss');
    }
  }
})();
