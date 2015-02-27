(function() {
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
	    if (locale && scope.languages[locale]) {
	      scope.activeLanguageKey = locale;
	    } else {
	      scope.activeLanguageKey = 'en';
	    }

	    scope.changeLanguage = changeLanguage;

	    function changeLanguage(key) {
	      if (_.has(scope.languages, key)) {
	        scope.activeLanguageKey = key;
	        $translate.use(scope.activeLanguageKey);  	  
	        wrapper.addClass('hide');      
	      }
	    }
		}
	}
})();