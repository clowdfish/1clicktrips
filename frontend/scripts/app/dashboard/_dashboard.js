(function() {
  angular
    .module('app.dashboard', [
      'ngAnimate'
    ])
    .config(interpolateConfig);

  function interpolateConfig($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }
})();
