(function() {

  'use strict';

  angular
    .module('app.booking')
    .controller('bookingCtrl', bookingCtrl);

  function bookingCtrl($scope, $state, bookingData, userProfile, AUTH_EVENTS, $anchorScroll) {
    window.MY_SCOPE = $scope; // DEBUG FROM CONSOLE
    console.log(bookingData); // DEBUGGING

    /**
    * Booking price before booking fee
    */
    $scope.bookingPrice = 0;

    /**
    * Booking price after booking fee
    */
    $scope.totalBookingPrice = 0;

    /**
    * Booking fee, calculate from booking rate and booking price
    */
    $scope.bookingFee = 0;

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
        user: {},
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

      $state.go($state.current, {}, {reload: true});
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

    $scope.successStep = function() {
      setStep(4);
    };

    function setStep(stepNumber) {
      $scope.step = stepNumber;
      $anchorScroll(0);
    }

    function populateProfileData() {
      if ( userProfile != null
        && _.isObject(userProfile)
        && _.has(userProfile, 'email')) {
        $scope.bookingData.user = userProfile;
      }
    }

    function mapView() {
      $state.go('search_result', bookingData['search'])
    }
  }

})();
