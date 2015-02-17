(function() {
  angular
    .module('app.common')
    .filter('arraySlice', arraySlice);

  function arraySlice() {
    return function(array, offset, limit) {
      return array.slice(offset, offset + limit);
    }
  }
})();