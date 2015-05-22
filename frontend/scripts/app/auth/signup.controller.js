(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('signupCtrl', signupCtrl);

  function signupCtrl($scope, $modalInstance, $rootScope, AUTH_EVENTS, authApi, authHelper) {

    $scope.agreement = false;

    /**
     * Sign up by email and password
     */
    $scope.signup = function() {
      if($scope.agreement)
        authApi
          .signup($scope.signupData)
          .then(function() {
            $rootScope.$broadcast(AUTH_EVENTS.signupSuccess);
          }, function(data) {
            $rootScope.$broadcast(AUTH_EVENTS.signupFailed);
            handleSignupError(data);
          });
      else
        handleSignupError({ message: "status.user.error.signup.agreement" });
    };

    // close sign up modal when sign up success
    $scope.$on(AUTH_EVENTS.signupSuccess, function() {
      $modalInstance.close();
    });

    // show login modal
    $scope.showLoginModal = function() {
      $modalInstance.close();
      authHelper.openLoginDialog();
    };

    // show error message when sign up failed
    function handleSignupError(signupResponse) {
      switch (signupResponse.message) {
        case 'status.user.error.signup.exists':
          $scope.signupForm.email.$error.exist = true;
          $scope.signupForm.email.$error.other = false;
          $scope.signupForm.email.$error.agreement = false;
          break;
        case 'status.user.error.signup.agreement':
          $scope.signupForm.email.$error.agreement = true;
          $scope.signupForm.email.$error.exist = false;
          $scope.signupForm.email.$error.other = false;
          break;
        default:
          $scope.signupForm.email.$error.other = true;
          $scope.signupForm.email.$error.agreement = false;
          $scope.signupForm.email.$error.exist = false;
          break;
      }
    }

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();
