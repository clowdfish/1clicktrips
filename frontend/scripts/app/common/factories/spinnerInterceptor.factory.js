(function() {

  angular
    .module('app.common')
    .factory('spinnerInterceptor', spinnerInterceptor);

  /**
  * Show spinner
  */
  function spinnerInterceptor($timeout, $rootScope, requestSpinnerEvents) {
    var lastSpinnerObject = null;
    return {

      request: function(config) {
        if (_.has(config, 'waitingMessage')) {
          lastSpinnerObject = {
            method: config.method,
            url: config.url
          }
          $rootScope.$broadcast(requestSpinnerEvents.show, {
            title: config.waitingMessage
          });
        }
        return config;
      },

      response: function(response) {
        if (lastSpinnerObject != null &&
              response.config.url == lastSpinnerObject.url &&
              response.config.method == lastSpinnerObject.method) {

          $rootScope.$broadcast(requestSpinnerEvents.hide);
          lastSpinnerObject = null;
        }

        return response;
      }

    };




  }
})();
