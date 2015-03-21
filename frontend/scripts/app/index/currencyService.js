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
		this.getCurrencyDataByCode = getCurrencyDataByCode;

		function getAvailableCurrencies() {
			return _this.currencyData;
		}

		function setActiveCurrency(code) {
			localStorageService.set('activeCurrency', code);
		}

		function getActiveCurrency() {
			return localStorageService.get('activeCurrency');
		}

		function getCurrencyDataByCode(code) {
			if (!code) return null;

			return _.find(_this.currencyData, function(item) {
				return item.code.toLowerCase() === code.toLowerCase();
			});
		}

		return this;
	}
})();
