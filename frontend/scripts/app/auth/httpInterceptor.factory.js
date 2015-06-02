(function() {
  angular
    .module('app.auth')
    .factory('httpInterceptor', httpInterceptor);

  /**
  * Inject token and language to http request header
  */
  function httpInterceptor($rootScope, $q, AUTH_EVENTS, session, appConfig) {
    return {

      request: function(config) {
        config = injectToken(config);
        config = injectLanguage(config);
        return config;
      },

      responseError: function(rejection) {
        if (rejection.status === 401) {
          $rootScope.$broadcast(AUTH_EVENTS.invalidToken);
        }
        return $q.reject(rejection);
      }

    };

    function injectToken(config) {
      var token = session.getAuthToken();
      if (token) {
        config.headers['x-access-token'] = token;
      }
      return config;
    }

    function injectLanguage(config) {
      config.headers['x-language'] = appConfig.activeLanguageKey;
      return config;
    }


  }
})();
