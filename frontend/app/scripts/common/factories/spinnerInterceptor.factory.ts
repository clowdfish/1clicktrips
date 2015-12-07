/// <reference path="../../_all.ts" />
module Common {

	'use strict';

	/**
  * Show spinner
  */
  export class SpinnerIntercepter {
    private lastSpinnerObject;
    
    constructor(private $q: ng.IQService, 
                private $rootScope: ng.IRootScopeService, 
                private requestSpinnerEvents) {      
    }
    
    /**
    * Compare url and method with last request's url and method
    */
    private _canHideSpinner = (httpConfig): boolean => {
      return !!(this.lastSpinnerObject != null &&
              httpConfig.url == this.lastSpinnerObject.url &&
              httpConfig.method == this.lastSpinnerObject.method);
    };

    private _broadcastShowSpinnerEevent = (httpConfig, data) => {
      this.lastSpinnerObject = {
        method: httpConfig.method,
        url: httpConfig.url
      };
      this.$rootScope.$broadcast(this.requestSpinnerEvents.show, data);
    };

    private _broadcastHideSpinnerEvent = () => {
      this.$rootScope.$broadcast(this.requestSpinnerEvents.hide);
      this.lastSpinnerObject = null;
    };
    
    /**
    * Show spinner when get waitingMessage
    */
    public request = (config) => {      
      if (_.has(config, 'activeMessages')) {
        this._broadcastShowSpinnerEevent(config, {
          activeMessages: config.activeMessages
        });
      }
      return config; 
    };
    
    /**
    * Hide spinner when response info matches request info
    */
    public response = (response) => {
      if (this._canHideSpinner(response.config)) {
        this._broadcastHideSpinnerEvent();
      }
      return response;
    };
    
    /**
    * Hide spinner when response error
    */
    public responseError = (rejection) => {
      if (this._canHideSpinner(rejection.config)) {
        this._broadcastHideSpinnerEvent();
      }
      return this.$q.reject(rejection);
    };

    /**
    * Hide spinner when request error
    */
    public requestError = (rejection) => {
      if (this._canHideSpinner(rejection.config)) {
        this._broadcastHideSpinnerEvent();
      }
      return this.$q.reject(rejection);
    };

    public static Factory() {
      var service = ($q, $rootScope, requestSpinnerEvents) => {
        return new SpinnerIntercepter($q, $rootScope, requestSpinnerEvents); 
      };

      service['$inject'] = ['$q', '$rootScope', 'requestSpinnerEvents'];
      return service; 
    }
  }
}
