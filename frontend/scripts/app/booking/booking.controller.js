(function() {

  'use strict';

  angular
    .module('app.booking')
    .controller('bookingCtrl', bookingCtrl);

  function bookingCtrl($scope, $state, bookingData, userProfile, AUTH_EVENTS, $anchorScroll) {
    window.MY_SCOPE = $scope; // DEBUG FROM CONSOLE
    console.log(bookingData); // DEBUGGING

    /**
    * Booking step ( total 3 steps )
    */
    $scope.step = 1;

    /**
    * Initialize bookingData
    */

    if (bookingData !== null) {
      $scope.bookingData = {
        trip: bookingData['trip'],
        payment: {},
        userProfile: {},
        isConfirm: false
      };

      populateProfileData();
    }

    /**
    * User profile data for payment form
    */
    $scope.userProfile = userProfile;

    /**
    * Change step number
    */
    $scope.setStep = setStep;

    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
      $state.reload();
      populateProfileData();
    });

    $scope.mapView = mapView;

    $scope.selectionStep = function() {
      setStep(1);
    };

    $scope.paymentStep = function() {
      setStep(2);
    };

    $scope.confirmationStep = function() {
      setStep(3);
    };

    function setStep(stepNumber) {
      $scope.step = stepNumber;
      $anchorScroll(0);
    }

    function populateProfileData() {
      if ( userProfile != null
        && _.isObject(userProfile)
        && _.has(userProfile, 'email')) {
        $scope.bookingData.userProfile = userProfile;
      }
    }

    function mapView() {
      $state.go('search_result', bookingData['search'])
    }
  }

})();
