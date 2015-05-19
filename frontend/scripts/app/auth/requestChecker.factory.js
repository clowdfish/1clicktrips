/**
 * Stop certain requests if user is not authenticated
 */
(function() {

  'use strict';

  angular
    .module('app.auth')
    .factory('requestChecker', requestChecker);

  function requestChecker($q, session) {
    //Catch all requests start with /api/account
    var regrex = /^\/api\/account\//;
    return {

      request: function(config) {
        var deferred = $q.defer();
        config.timeout = deferred.promise;

        if ( ! session.isLogin() && config.url.match(regrex) !== null) {
          //console.log('Stop request to ', config.url);
          deferred.resolve();
        }

        return config || $q.when(config);
      }

    };
  }

})();
