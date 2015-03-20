(function() {

  'use strict';

	angular
		.module('app.index')
		.service('currencyService', currencyService);

	function currencyService($http, $q, localStorageService, appConfig) {
		var _this = this;

		this.currencyData = window["AppData"]["currencies"];

		this.getAvailableCurrencies = getAvailableCurrencies;
		this.setActiveCurrency = setActiveCurrency;
		this.getActiveCurrency = getActiveCurrency;
		this.getCurrencyDataByKey = getCurrencyDataByKey;

		function getAvailableCurrencies() {
			return _this.currencyData;
		}

		function setActiveCurrency(key) {
			localStorageService.set('activeCurrency', key);
		}

		function getActiveCurrency() {
			return localStorageService.get('activeCurrency');
		}

		function getCurrencyDataByKey(code) {
			if (!code) return null;

			return _.find(_this.currencyData, function(item) {
				return item.code.toLowerCase() === code.toLowerCase();
			});
		}

		return this;
	}
})();
