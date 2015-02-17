(function() {
  angular
    .module('app.dashboard')
    .directive('bookedTrips', bookedTrips);

  function bookedTrips() {
    return {
      restrict: 'EA',
      templateUrl: 'scripts/app/templates/dashboard/booked-trips.html',
      scope: {
        listItems: '=',
        itemPerPage: '@'
      },
      link: link
    }

    function link(scope, elements, attrs) {

      scope.$watch('listItems', function() {
        initialize();
      });

      function initialize() {
        if (scope.listItems.length == 0) {
          return;
        }
        console.log(scope.listItems, scope.itemPerPage);
        scope.currentPage = 1;
        scope.itemPerPage = parseInt(scope.itemPerPage);
        scope.totalPage = Math.round(scope.listItems.length / scope.itemPerPage);
      }
    }
  }
})();