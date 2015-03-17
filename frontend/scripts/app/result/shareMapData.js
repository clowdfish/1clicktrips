(function() {

  'use strict';

  angular
    .module('app.result')
    .service('shareMapData', shareMapData);

  function shareMapData() {
    this.selectedSegment = null;
    return this;
  }

})();
