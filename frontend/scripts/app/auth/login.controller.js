(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('loginCtrl', loginCtrl);

  function loginCtrl($scope,
                    $rootScope,
                    $modal,
                    $modalInstance,
                    AUTH_EVENTS,
                    oAuthDialog,
                    authApi,
                    authHelper) {

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
      var remember = $scope.rememberMe ? true : false;
      authApi
        .login(loginData, remember)
        .then(function(data) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        }, function(data) {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          handleLoginError(data);
        });
    };

    $scope.loginOnKeydown = function($event) {
      if ($event.keyCode === 13) {
        $scope.login();
      }
    }

    /**
     * Close login modal when login success
     */
    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
      $modalInstance.close();
    });

    // show signup modal
    $scope.showSignupModal = function() {
      $modalInstance.close();
      authHelper.openSignupDialog();
    };

    $scope.showForgotPasswordModal = function() {
      $modalInstance.close();
      var modalInstance = $modal.open({
        templateUrl: 'scripts/app/templates/auth/forgot-password.html',
        controller: 'forgotPasswordCtrl',
        size: 'lg'
      });
    };

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

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();
