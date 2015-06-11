/**
 * Stop certain requests if user is not authenticated
 */
(function() {

  'use strict';

  angular
    .module('app.auth')
    .factory('requestChecker', requestChecker);

  function requestChecker($q, session) {
    // catch all requests start with /api/account
    var regex = /^\/api\/account\//;

    return {
      request: function(config) {
        var deferred = $q.defer();
        config.timeout = deferred.promise;

        if ( ! session.isLogin() && config.url.match(regex) !== null) {
          //console.log('Stop request to ', config.url);
          deferred.resolve();
        }

        return config || $q.when(config);
      }
    };
  }
})();
