(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('loginCtrl', loginCtrl);

  function loginCtrl($scope, $rootScope, $modalInstance, AUTH_EVENTS, oAuthDialog, authService) {

    /**
     * Login by Twitter
     */
    $scope.loginTwitter = function() {
      oAuthDialog.createAuthDialog('twitter');
    };

    /**
     * Login by email and password
     */
    $scope.login = function() {

      var loginData = {
        email: $scope.email,
        password: $scope.password
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

    /**
     * Close login modal when login success
     */
    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
      $modalInstance.close();
    });

    /**
     * Show message when login error
     * @param  {Object} data [Object contains error message and error status code]
     * @return {null}
     */
    function handleLoginError(data) {
      if (data.status == 401) {
        $scope.loginForm.$error.unauthorized = true;
      }
    }

  }
})();
