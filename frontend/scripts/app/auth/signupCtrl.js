(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('signupCtrl', signupCtrl);

  function signupCtrl($scope, $modal, $modalInstance, $rootScope, AUTH_EVENTS, authService) {

    $scope.agreement = false;

    /**
     * Sign up by email and password
     */
    $scope.signup = function() {
      if($scope.agreement)
        authService
          .signup($scope.signupData)
          .then(function() {
            $rootScope.$broadcast(AUTH_EVENTS.signupSuccess);
          }, function(data) {
            $rootScope.$broadcast(AUTH_EVENTS.signupFailed);
            console.log(data.message);
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
      var modalInstance = $modal.open({
        templateUrl: 'scripts/app/templates/auth/login-modal.html',
        controller: 'loginCtrl',
        size: 'lg'
      });
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