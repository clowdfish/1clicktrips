(function() {

	'use strict';

	angular
		.module('app.auth')
		.service('authHelper', authHelper);

  /**
  * Helper to open signin and sigup dialog, redirect after signup or signup success
  */
	function authHelper($modal) {
		var _this = this;
		this.redirectState = null;

    /**
    * Get state data for redirect
    */
		this.getRedirectState = function() {
			return this.redirectState;
		};

    /**
    * Open login dialog
    */
		this.openLoginDialog = function(stateName, data) {
			$modal.open({
        templateUrl: 'scripts/app/templates/auth/login-modal.html',
        controller: 'loginCtrl',
        size: 'lg'
      });
			setRedirectState(stateName, data);
		};

    /**
    * Open signup dialog
    */
		this.openSignupDialog = function(redirectStateName, redirectData) {
			$modal.open({
        templateUrl: 'scripts/app/templates/auth/signup-modal.html',
        controller: 'signupCtrl',
        size: 'lg'
      });
			setRedirectState(redirectStateName, redirectData);
		};

    /**
    * Store redirect state name and state data
    */
		function setRedirectState(stateName, data) {
			data = data || {};
			if (stateName === undefined || stateName === null) {
				_this.redirectState = null;
				return;
			}
			_this.redirectState = {
				state: stateName,
				data: data
			};
		};

	}

})();
