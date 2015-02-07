(function() {
  angular
    .module('app.result')
    .directive('segmentAlternativeList', segmentAlternativeList);

  function segmentAlternativeList() {
    return {
      require: '^itineraryMap',
      restrict: 'EA',
      templateUrl: 'js/templates/result/segment-alternative-list.html',
      scope: {
        select: '=',
        segment: '=',
        alternatives: '=',
        isShowing: '='
      },
      link: link
    }

    function link(scope, element, attrs, itineraryMapCtrl) {
      scope.closePanel = closePanel;
      function closePanel() {
        scope.isShowing = false;
      }
    }
  }
})();