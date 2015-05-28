(function() {

  'use strict';

	angular
		.module('app.index')
		.service('languageApi', languageApi);

	function languageApi($q, $sessionStorage, session, userApi) {
		var languageData = getAvailableLanguages();

		this.getAvailableLanguages = getAvailableLanguages;
		this.setActiveLanguageKey = setActiveLanguageKey;
		this.getActiveLanguageKey = getActiveLanguageKey;
		this.getLanguageDataByCode = getLanguageDataByCode;

		function getAvailableLanguages() {
			return window["AppData"]["languages"];
		}

		function setActiveLanguageKey(key) {

			return $q(function(resolve, reject) {
				$sessionStorage.activeLanguageKey = key;

				if (session.isLogin()) {
					// store active language key on server
					userApi
						.setUserProfile('language', key)
						.then(function() {
							resolve();
						})
						.catch(reject);
				} else {
					resolve();
				}
			});
		}

		function getActiveLanguageKey() {
			return $sessionStorage.activeLanguageKey;
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
