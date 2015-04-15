(function() {

  'use strict';

	angular
		.module('app.index')
		.service('currencyApi', currencyApi);

	function currencyApi($http, $q, $localStorage, appConfig) {
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
			$localStorage.activeCurrency = code;
		}

		function getActiveCurrency() {
			return $localStorage.activeCurrency;
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
