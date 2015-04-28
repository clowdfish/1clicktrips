(function() {

  'use strict';

  angular
    .module('app.booking')
    .controller('bookingCtrl', bookingCtrl);

  function bookingCtrl($scope, $state, trip, userProfile, AUTH_EVENTS) {

    console.log(trip);
    /**
    * Booking step ( total 3 steps )
    */
    $scope.step = 1;

    /**
    * Initialize bookingData
    */
    $scope.bookingData = {
      trip: trip,
      payment: {},
      userProfile: {},
      isConfirm: false
    }

    populateProfileData();

    /**
    * User profile data for payment form
    */
    $scope.userProfile = userProfile;

    /**
    * Change step number
    */
    $scope.setStep = setStep;

    $scope.paymentStep = function() {
      setStep(2);
    }

    $scope.confirmStep = function() {
      setStep(3);
    }

    function setStep(stepNumber) {
      $scope.step = stepNumber;
    }

    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
      $state.reload();
      populateProfileData();
    });

    function populateProfileData() {
      if ( userProfile != null
        && _.isObject(userProfile)
        && _.has(userProfile, 'email')) {
        $scope.bookingData.userProfile = userProfile;
      }
    }

  }

})();
