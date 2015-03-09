(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('loginCtrl', loginCtrl);

  function loginCtrl($scope, $rootScope, $modalInstance, AUTH_EVENTS, oAuthDialog, authService) {

    $scope.loginTwitter = function() {
      oAuthDialog.createAuthDialog('twitter');
    };

    $scope.login = function() {
      var loginData = {
        email: $scope.email,
        password: $scope.password,
        username: $scope.email
      };
      authService
        .login(loginData)
        .then(function(data) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        }, function(data) {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          handleLoginError(data);
        });
    }

    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
      $modalInstance.close();
    });

    function handleLoginError(data) {
      console.log($scope.loginForm);
      if (data.status == 401) {
        console.log('$scope.loginForm.$error.unauthorized');
        $scope.loginForm.$error.unauthorized = true;
      }
    }

  }
})();
