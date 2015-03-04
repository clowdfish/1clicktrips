(function() {
  angular
    .module('app.common')
    .filter('arraySlice', arraySlice);

  function arraySlice() {
    return function(array, offset, limit) {
      if ( ! array || ! array.length) {
        return [];
      }
      return array.slice(offset, offset + limit);
    }
  }
})();
