(function() {
	angular
		.module('app.index')
		.service('languageService', languageService);

	function languageService($http, $q) {
		var _this = this;
		this.getAvailableLanguages = getAvailableLanguages;
		this.callAvailableLanguagesApi = callAvailableLanguagesApi;
		
		function getAvailableLanguages() {
			return $q(function(resolve, reject) {
				_this
					.callAvailableLanguagesApi()	
					.then(function(response) {
						var result = {};
						for (var i = 0; i < response.length; i++) {
							result[response[i].code] = response[i];
						}
						resolve(result);
					}, function() {
						reject();
					});	
			});
		}

		function callAvailableLanguagesApi() {
			return $q(function(resolve, reject) {
				$http
					.get('/api/locales')
					.success(function(response) {
						resolve(response);
					})
					.error(function() {
						reject();
					})
			});
		}
		return this;
	}
})();