(function() {

  'use strict';

	angular
		.module('app.index')
		.directive('languageSwitcher', languageSwitcher);

	function languageSwitcher($translate, languageService) {
		return {
			restrict: 'EA',
			templateUrl: 'scripts/app/templates/index/language-switcher.html',
			scope: {
				activeLanguageKey: '=',
				languages: '='
			},
			link: link
		}

		function link(scope, element, attrs) {
			var wrapper = angular.element('.language-switcher-wrapper');

			scope.changeLanguage = changeLanguage;

			wrapper.hover(function() {
				$(this).removeClass('hide');
			});


	    function changeLanguage(key) {
	      if (_.has(scope.languages, key)) {
	      	languageService.setActiveLanguageKey(key);
	        scope.activeLanguageKey = key;
	        $translate.use(scope.activeLanguageKey);
	        wrapper.addClass('hide');
	      }
	    }
		}
	}
})();
