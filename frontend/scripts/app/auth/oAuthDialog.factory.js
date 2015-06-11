(function() {

  'use strict';

  angular
    .module('app.auth')
    .factory('oAuthDialog', oAuthDialog);

  /**
  * Create oAuth dialog
  */
  function oAuthDialog($rootScope, $window, AUTH_EVENTS, session) {

    //Only support Twitter login at this time
    var supportProvider = ['twitter'];

    /**
    * Create auth dialog for Twitter, Facebook, Google+ ...
    */
    this.createAuthDialog = function(provider) {
      if (supportProvider.indexOf(provider) === -1) {
        throw new Error( provider + ' provider is not supported');
      }
      var url = '/api/auth/' + provider;
      var width = 800;
      var height = 550;
      var top = ($window.outerHeight - height) / 2;
      var left = ($window.outerWidth - width) / 2;

      var windowOptions = 'width=' + width;
      windowOptions += ',height=' + height;
      windowOptions += ',scrollbars=0';
      windowOptions += ',top=' + top;
      windowOptions += ',left=' + left;

      var child = $window.open(url, provider + '_login', windowOptions);
      window.addEventListener("message", authDialogEventListener);
    };

    /**
    * Receive token from auth dialog
    */
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

    return this;
  }
})();
