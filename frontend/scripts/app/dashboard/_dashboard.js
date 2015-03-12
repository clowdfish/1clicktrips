(function() {
  angular
    .module('app.dashboard', [
      'app.core'
    ])
    .config(interpolateConfig);

  function interpolateConfig($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }
})();
