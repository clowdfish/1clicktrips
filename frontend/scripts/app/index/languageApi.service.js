(function() {

  'use strict';

	angular
		.module('app.index')
		.service('languageApi', languageApi);

	function languageApi($q, $localStorage, session, userApi) {
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
				if (!getLanguageDataByCode(key)) {
					return reject();
				}

				$localStorage.activeLanguageKey = key;

				if (session.isLogin()) {
					// store active language key on server
					userApi
						.setUserProfile('language', key)
						.then(function() {
							return resolve();
						})
						.catch(reject);
				} else {
					return resolve();
				}
			});
		}

		function getActiveLanguageKey() {
			return $localStorage.activeLanguageKey;
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
