(function() {
	
	'use strict';
	
	angular
		.module('app.auth')
		.service('authHelper', authHelper);
		
	function authHelper($modal) {
		var _this = this;		
		this.redirectState = null;
		
		this.getRedirectState = function() {
			return this.redirectState;
		};
		
		this.openLoginDialog = function(stateName, data) {
			$modal.open({
        templateUrl: 'scripts/app/templates/auth/login-modal.html',
        controller: 'loginCtrl',
        size: 'lg'
      });			
			setRedirectState(stateName, data);
		};
		
		this.openSignupDialog = function(redirectStateName, redirectData) {
			$modal.open({
        templateUrl: 'scripts/app/templates/auth/signup-modal.html',
        controller: 'signupCtrl',
        size: 'lg'
      });
			setRedirectState(redirectStateName, redirectData);
		};
		
		function setRedirectState(stateName, data) {			
			data = data || {};
			if (stateName === null) {
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