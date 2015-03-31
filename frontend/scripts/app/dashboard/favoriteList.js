(function() {
  angular
    .module('app.dashboard')
    .directive('favoriteList', favoriteList);

  function favoriteList() {
    return {
      restrict: 'EA',
      templateUrl: 'scripts/app/templates/dashboard/favorite-list.html',
      scope: {
        listItems: '=',
        itemPerPage: '@itemPerPage',
        selectFavorite: '='
      },
      link: link
    };

    function link(scope, element, attrs) {
      if ( scope.itemPerPage <= 0) {
        throw new Error('Invalid item per page');
      }

      scope.slideDirection = 'slide-left';
      scope.nextPage = nextPage;
      scope.previousPage = previousPage;

      scope.$watch('currentPage', function() {
        scope.offset = (scope.currentPage - 1) * scope.itemPerPage;
      });

      scope.$watch('listItems', function() {
        scope.itemPerPage = parseInt(scope.itemPerPage);
        scope.totalPage = Math.ceil(scope.listItems.length / scope.itemPerPage);
        scope.currentPage = 1;
        scope.disablePreviousPageButton = true;
        scope.disableNextPageButton = scope.totalPage == 1;
      });

      function nextPage() {
        if (scope.currentPage < scope.totalPage) {
          scope.currentPage++;
          scope.slideDirection = 'slide-left';
        }
        if (scope.currentPage == scope.totalPage) {
          scope.disableNextPageButton = true;
          scope.disablePreviousPageButton = false;
        }
      }

      function previousPage() {
        if (scope.currentPage > 1) {
          scope.currentPage--;
          scope.slideDirection = 'slide-right'
        }
        if (scope.currentPage == 1) {
          scope.disablePreviousPageButton = true;
          scope.disableNextPageButton = false;
        }
      }
    }
  }
})();
