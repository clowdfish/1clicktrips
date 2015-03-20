(function() {

  'use strict';

	angular
		.module('app.index')
		.service('languageService', languageService);

	function languageService($http, $q, localStorageService) {
		var _this = this;
		this.getAvailableLanguages = getAvailableLanguages;
		this.setActiveLanguageKey = setActiveLanguageKey;
		this.getActiveLanguageKey = getActiveLanguageKey;

		function getAvailableLanguages() {
			return $q(function(resolve, reject) {
				$http
					.get('/api/locales')
					.success(function(response) {
						var result = {};
						for (var i = 0; i < response.length; i++) {
							result[response[i].code] = response[i];
						}
						resolve(result);
					})
					.error(function(data, status) {
						reject({
							data: data,
							status: status
						});
					});
			});
		}

		function setActiveLanguageKey(key) {
			localStorageService.set('activeLanguageKey', key);
		}

		function getActiveLanguageKey() {
			return localStorageService.get('activeLanguageKey');
		}

		return this;
	}
})();
