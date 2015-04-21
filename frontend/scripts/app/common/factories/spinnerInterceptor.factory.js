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
          broadcastShowSpinnerEevent(config, config.waitingMessage);
        }
        return config;
      },

      /**
      * Hide spinner when response info matchs request info
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
      if (lastSpinnerObject != null &&
              httpConfig.url == lastSpinnerObject.url &&
              httpConfig.method == lastSpinnerObject.method) {
        return true;
      }
      return false;
    }

    function broadcastShowSpinnerEevent(httpConfig, title) {
      lastSpinnerObject = {
        method: httpConfig.method,
        url: httpConfig.url
      }
      $rootScope.$broadcast(requestSpinnerEvents.show, {
        title: title
      });
    }

    function broadcastHideSpinnerEvent() {
      $rootScope.$broadcast(requestSpinnerEvents.hide);
      lastSpinnerObject = null;
    }


  }
})();
