(function() {
  angular
    .module('app.dashboard')
    .directive('favoriteList', favoriteList);

  function favoriteList($timeout) {
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

      /**
      * Keep a context for this directive
      */
      var _this = this;

      /**
      * jQuery element
      */
      var $element = $(element);

      /**
      * Map container
      */
      var $overviewMap = $element.find('.overview-map');

      /**
      * @type boolean - show detail view
      */
      scope.isShowingFavoriteDetail = false;

      /**
      * @type google.maps.Map
      * Map
      */
      this.map = new google.maps.Map($overviewMap[0], {
        zoom: 15
      });

      /**
      * @type google.maps.LatLngBounds - Map boundaries
      */
      this.mapBounds = new google.maps.LatLngBounds();

      /**
      * @type Array<google.maps.LatLng>
      * Array of map markers
      */
      this.markers = [];

      /**
      * Favorite list animation class
      */
      scope.slideDirection = 'slide-left';

      /**
      * @type Function - Next page function
      */
      scope.nextPage = nextPage;

      /**
      * @type Function - Previous page function
      */
      scope.previousPage = previousPage;

      /**
      * @type Function - Show detail view
      */
      scope.detailView = detailView;

      /**
      * @type Function Show list view
      */
      scope.listView = listView;

      /**
      * Scroll to top then call selectFavorite();
      */
      scope.callSelectFavoriteFunction = callSelectFavoriteFunction;

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

      scope.$on('$destroy', function() {
        destroy();
      });

      function callSelectFavoriteFunction(favorite) {
        $('body').animate({
          scrollTop: 0
        });
        scope.selectFavorite(favorite);
      }

      function listView() {
        scope.isShowingFavoriteDetail = false;
      }

      function detailView(favorite) {
        scope.favorite = favorite;
        scope.isShowingFavoriteDetail = true;
        showOverviewMap(favorite.origin.location, favorite.destination.location);
      }

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

      function showOverviewMap(originLocation, destinationLocation) {
        clearMarkers();
        this.mapBounds = new google.maps.LatLngBounds();
        addLocation(originLocation);
        addLocation(destinationLocation);
        map.fitBounds(mapBounds);
      }

      /**
      * Add markers, boundaries to map
      */
      function addLocation(location) {
        var latLng = new google.maps.LatLng(location.latitude, location.longitude);
        var marker = new google.maps.Marker({
          map: _this.map,
          position: latLng
        });
        this.markers.push(marker);
        this.mapBounds.extend(latLng);
        $timeout(function() {
          google.maps.event.trigger(_this.map, 'resize');
          _this.map.fitBounds(mapBounds);
        }, 50);

      }

      /**
      * Clear marker array
      */
      function clearMarkers() {
        for (var i = 0; i < markers.length > 0; i++) {
          this.markers[i].setMap(null);
        }
        this.markers = [];
      }

      /**
      * Destroy map data
      */
      function destroy() {
        clearMarkers();
        this.markers = [];
        this.mapBounds = null;
        this.map.remove();
      }
    }
  }
})();
