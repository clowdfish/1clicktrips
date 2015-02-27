(function() {

  'use strict';

	angular
		.module('app.index')
		.directive('currencySwitcher', currencySwitcher);

	function currencySwitcher($translate, currencyService) {
		return {
			restrict: 'EA',
			templateUrl: 'scripts/app/templates/index/currency-switcher.html',
			scope: {
				activeCurrency: '='
			},
			link: link
		}

		function link(scope, element, attrs) {
			var wrapper = angular.element('.currency-switcher-wrapper');
			wrapper.hover(function() {
				$(this).removeClass('hide');
			});

			scope.currencies = {};
			scope.activeCurrency = currencyService.getActiveCurrency();
			if (scope.activeCurrency == null) {
				scope.activeCurrency = 'usd';
			}
	    currencyService
	      .getAvailableCurrencies()
	      .then(function(data) {
	        scope.currencies = data;

	      });

	    scope.changeCurrency = changeCurrency;

	    function changeCurrency(key) {
	      if (_.has(scope.currencies, key)) {
	      	currencyService.setActiveCurrency(key);
	        scope.activeCurrency = key;
	        wrapper.addClass('hide');
	      }
	    }
		}
	}
})();
