(function() {

  angular
    .module('app.common')
    .factory('spinnerInterceptor', spinnerInterceptor);

  /**
  * Show spinner
  */
  function spinnerInterceptor($q, $rootScope, requestSpinnerEvents) {
    var lastSpinnerObject = null;

    return {
      /**
      * Show spinner when get waitingMessage
      */
      request: function(config) {
        if (_.has(config, 'waitingMessage')) {
          broadcastShowSpinnerEevent(config, {
            title: config.waitingMessage
          });
        } else if (_.has(config, 'activeMessages')) {
          broadcastShowSpinnerEevent(config, {
            activeMessages: config.activeMessages
          });
        }

        return config;
      },

      /**
      * Hide spinner when response info matches request info
      */
      response: function(response) {
        if (canHideSpinner(response.config)) {
          broadcastHideSpinnerEvent()
        }

        return response;
      },

      /**
      * Hide spinner when response error
      */
      responseError: function(rejection) {
        if (canHideSpinner(rejection.config)) {
          broadcastHideSpinnerEvent();
        }
        return $q.reject(rejection);
      },

      /**
      * Hide spinner when request error
      */
      requestError: function(rejection) {
        if (canHideSpinner(rejection.config)) {
          broadcastHideSpinnerEvent();
        }
        return $q.reject(rejection);
      }

    };

    /**
    * Compare url and method with last request's url and method
    */
    function canHideSpinner(httpConfig) {
      return !!(lastSpinnerObject != null &&
      httpConfig.url == lastSpinnerObject.url &&
      httpConfig.method == lastSpinnerObject.method);

    }

    function broadcastShowSpinnerEevent(httpConfig, data) {
      lastSpinnerObject = {
        method: httpConfig.method,
        url: httpConfig.url
      };
      $rootScope.$broadcast(requestSpinnerEvents.show, data);
    }

    function broadcastHideSpinnerEvent() {
      $rootScope.$broadcast(requestSpinnerEvents.hide);
      lastSpinnerObject = null;
    }
  }
})();
