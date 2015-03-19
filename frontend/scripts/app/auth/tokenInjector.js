(function() {
  angular
    .module('app.auth')
    .factory('tokenInjector', tokenInjector);

  /**
  * Inject token to http request header
  */
  function tokenInjector($rootScope, $q, AUTH_EVENTS, session) {
    return {

      request: function(config) {
        var token = session.getAuthToken();
        if (token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      },

      responseError: function(rejection) {
        if (rejection.status === 401) {
          $rootScope.$broadcast(AUTH_EVENTS.invalidToken);
        }
        return $q.reject(rejection);
      }

    };
  }
})();
