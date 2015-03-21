(function() {

  'use strict';

	angular
		.module('app.index')
		.service('languageService', languageService);

	function languageService($http, $q, localStorageService) {
		var _this = this;
		var languageData = getAvailableLanguages();
		this.getAvailableLanguages = getAvailableLanguages;
		this.setActiveLanguageKey = setActiveLanguageKey;
		this.getActiveLanguageKey = getActiveLanguageKey;
		this.getLanguageDataByCode = getLanguageDataByCode;

		function getAvailableLanguages() {
			return window["AppData"]["languages"];
		}

		function setActiveLanguageKey(key) {
			localStorageService.set('activeLanguageKey', key);
		}

		function getActiveLanguageKey() {
			return localStorageService.get('activeLanguageKey');
		}

		function getLanguageDataByCode(code) {
			if (!code) return null;

			return _.find(languageData, function(item) {
				return item.code.toLowerCase() === code.toLowerCase();
			});
		}

		return this;
	}
})();
