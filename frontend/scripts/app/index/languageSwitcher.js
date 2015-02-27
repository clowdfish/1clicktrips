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
				activeLanguageKey: '='
			},
			link: link
		}

		function link(scope, element, attrs) {
			var wrapper = angular.element('.language-switcher-wrapper');
			wrapper.hover(function() {
				$(this).removeClass('hide');
			});

			scope.languages = {};
	    languageService
	      .getAvailableLanguages()
	      .then(function(data) {
	        scope.languages = data;
	      });

	    //Set default languages
	    var storageLanguageKey = languageService.getActiveLanguageKey();
	    if (storageLanguageKey == null) {
	    	if (locale && scope.languages[locale]) {
		      scope.activeLanguageKey = locale;
		    } else {
		      scope.activeLanguageKey = 'en';
		    }
	    } else {
	    	scope.activeLanguageKey = storageLanguageKey;
	    }
	    $translate.use(scope.activeLanguageKey);

	    scope.changeLanguage = changeLanguage;

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
