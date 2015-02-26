(function() {
  angular
    .module('app.index')
    .controller('indexCtrl', indexCtrl);

  function indexCtrl($scope, $rootScope, $translate) {
    $scope.languages = {
      en: 'Eng',
      de: 'Ger'
    }

    if (locale && $scope.languages[locale]) {
      $scope.activeLanguageKey = locale;
    } else {
      $scope.activeLanguageKey = 'en';
    }

    $scope.changeLanguage = changeLanguage;

    function changeLanguage() {
      $scope.activeLanguageKey = $scope.activeLanguageKey == 'en' ? 'de' : 'en';
      $translate.use($scope.activeLanguageKey);
      $rootScope.currencySymbol = getCurrencySymbol($scope.activeLanguageKey);
    }

    function getCurrencySymbol(activeLanguageKey) {
      switch (activeLanguageKey) {
        case 'de':
          return '€';
        case 'en':
        default:
          return '$';
      }
    }
  }
})();