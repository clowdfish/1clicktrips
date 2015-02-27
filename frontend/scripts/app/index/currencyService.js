(function() {
	angular
		.module('app.index')
		.service('currencyService', currencyService);

	function currencyService($http, $q) {
		var _this = this;
		this.getAvailableCurrencies = getAvailableCurrencies;
		this.callGetAvailableCurrenciesApi = callGetAvailableCurrenciesApi;

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

		return this;
	}
})();