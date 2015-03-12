(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('signupCtrl', signupCtrl);

  function signupCtrl($scope, $modal, $modalInstance, $rootScope, AUTH_EVENTS, authService) {
    /**
     * Signup by email and password
     * @param  {Object} signupData [object contains email and password]
     */
    $scope.signup = function() {
      authService
        .signup($scope.signupData)
        .then(function() {
          $rootScope.$broadcast(AUTH_EVENTS.signupSuccess);
        }, function(data) {
          $rootScope.$broadcast(AUTH_EVENTS.signupFailed);
          handleSignupError(data);
        });
    }

    //Close signup modal when sign up success
    $scope.$on(AUTH_EVENTS.signupSuccess, function() {
      $modalInstance.close();
    });

    //Show logo modal
    $scope.showLoginModal = function() {
      $modalInstance.close();
      var modalInstance = $modal.open({
        templateUrl: 'scripts/app/templates/auth/login-modal.html',
        controller: 'loginCtrl',
        size: 'lg'
      });
    }

    //Show error message when signup failed
    function handleSignupError(signupResponse) {
      switch (signupResponse.message) {
        case 'status.user.error.signup.exists':
          $scope.errorMessage = 'This email is already used.';
          $scope.signupForm.email.$error.exist = true;
          break;
        case 'status.user.error.authorization.failure':
        default:
          //@todo: show error message for other errors
          break;
      }
    }



  }
})();
