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
    };

    function link(scope, elements, attrs) {
      initialize();

      scope.$watch('listItems', function() {
        initialize();
      });

      scope.$watch('currentPage', function() {
        scope.offset = (scope.currentPage - 1) * scope.itemPerPage;
      });

      scope.changePage = changePage;

      function initialize() {
        if (scope.listItems.length == 0) {
          return;
        }
        scope.currentPage = 1;
        scope.itemPerPage = parseInt(scope.itemPerPage);
        scope.totalPage = Math.round(scope.listItems.length / scope.itemPerPage);
        scope.offset = (scope.currentPage - 1) * scope.itemPerPage;
      }

      function changePage(number) {
        if (number > 0 && number <= scope.totalPage) {
          scope.currentPage = number;
        }
      }

    }
  }
})();