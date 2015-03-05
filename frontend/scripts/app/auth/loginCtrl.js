(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('loginCtrl', loginCtrl);

  function loginCtrl($scope, $rootScope, $window, AUTH_EVENTS, session) {
    $scope.loginTwitter = loginTwitter;

    function loginTwitter() {
      createAuthDialog();
    }

    /**
    * Create auth dialog
    */
    function createAuthDialog() {
      var url = '/api/auth/twitter';
      var width = 800;
      var height = 550;
      var top = ($window.outerHeight - height) / 2;
      var left = ($window.outerWidth - width) / 2;
      var windowOptions = 'width=' + width;
      windowOptions += ',height=' + height;
      windowOptions += ',scrollbars=0';
      windowOptions += ',top=' + top;
      windowOptions += ',left=' + left;
      var child = $window.open(url, 'twitter_login', windowOptions);
      window.addEventListener("message", authDialogEventListener);
    }

    function authDialogEventListener(msg) {
      if (msg.data.name === "authState") {
        $rootScope.$apply(function() {
          switch (msg.data.state) {
            case 'success':
              session.authSuccess(msg.data.token);
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
              console.log('Login successful');
              break;
            case 'failed':
            default:
              session.authFailed();
              $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
              console.log('Login failed');
              break;
          }
        });
      }
    }
  }
})();
