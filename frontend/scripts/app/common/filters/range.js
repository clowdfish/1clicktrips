/**
* Create range by array
* Eg:
* [4] => [0,1,2,3]
* [2,4] => [2,3,4]
* Usage:
* <div ng-repeat='number in [2,4] | range'></div>
*/
(function() {

  'use strict';

  angular
    .module('app.common')
    .filter('range', range);

  function range() {
    return function(input) {
      var lowBound,
          highBound;
      if (input.length == 1) {
        lowBound = 0;
        highBound = input[0];
      } else if (input.length == 2) {
        lowBound = input[0];
        highBound = input[1];
      }
      var result = [];
      for (var i = lowBound; i <= highBound; i++ ) {
        result.push(i);
      }
      return result;
    }
  }

})();
