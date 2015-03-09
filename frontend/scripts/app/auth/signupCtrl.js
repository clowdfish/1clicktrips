(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('signupCtrl', signupCtrl);

  function signupCtrl($scope, $modal, $modalInstance, $rootScope, AUTH_EVENTS, authService) {

    $scope.signup = function(signupData) {
      authService
        .signup(signupData)
        .then(function() {
          $rootScope.$broadcast(AUTH_EVENTS.signupSuccess);
        }, function(data) {
          $rootScope.$broadcast(AUTH_EVENTS.signupFailed);
          handleSignupError(data);
        });
    }

    $scope.$on(AUTH_EVENTS.signupSuccess, function() {
      $modalInstance.close();
    });

    $scope.login = function() {
      $modalInstance.close();
      var modalInstance = $modal.open({
        templateUrl: 'scripts/app/templates/auth/login-modal.html',
        controller: 'loginCtrl',
        size: 'lg'
      });
    }

    function handleSignupError(signupResponse) {
      switch (signupResponse) {
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
