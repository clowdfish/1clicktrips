(function() {

  'use strict';

	angular
		.module('app.index')
		.service('currencyService', currencyService);

	function currencyService($http, $q, localStorageService) {
		var _this = this;

		this.getAvailableCurrencies = getAvailableCurrencies;
		this.callGetAvailableCurrenciesApi = callGetAvailableCurrenciesApi;
		this.setActiveCurrency = setActiveCurrency;
		this.getActiveCurrency = getActiveCurrency;
		this.getCurrencySymbol = getCurrencySymbol;

		function getAvailableCurrencies() {
			return $q(function(resolve, reject) {
				_this
					.callGetAvailableCurrenciesApi()
					.then(function(response) {
						var result = {};
						for (var i = 0; i < response.length; i++) {
							result[response[i].code.toLowerCase()] = response[i];
						}
						resolve(result);
					}, function() {
						reject();
					});
			});
		}

		function callGetAvailableCurrenciesApi() {
			return $q(function(resolve, reject) {
				$http
					.get('/api/currencies')
					.success(function(response) {
						resolve(response);
					})
					.error(function() {
						reject();
					});
			});
		}

		function setActiveCurrency(key) {
			localStorageService.set('activeCurrency', key);
		}

		function getActiveCurrency() {
			return localStorageService.get('activeCurrency');
		}

		function getCurrencySymbol(currencyKey) {
      switch (currencyKey) {
        case 'eur':
          return '€';
        case 'usd':
        default:
          return '$';
      }
    }

		return this;
	}
})();
