(function() {
  angular
    .module('app.index')
    .controller('indexCtrl', indexCtrl);

  function indexCtrl($scope, $rootScope, $translate) {
    $scope.activeCurrency = 'usd';

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