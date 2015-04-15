(function() {

  'use strict';

  angular
    .module('app.settings')
    .directive('favoriteTable', favoriteTable);

  function favoriteTable() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/settings/favorite-table.html',
      scope: {
        favorites: '='
      },
      link: link,
      controller: controller
    };

    function link(scope, element, attr) {

    }

    function controller($scope, favoriteApi) {
      $scope.sortableOptions = {
        axis: 'y',
        update: updatePosition
      }

      $scope.deleteFavorite = function(favorite) {
        favoriteApi
          .deleteFavorite(favorite.id)
          .then(function() {
            $scope.favorites = _.reject($scope.favorites, function(item) {
              return item.id == favorite.id
            });
          }, function(reason) {
            alert('Error while delete favorite');
          });
      }

      function updatePosition(e, ui) {
        var position = 0;
        var positionData = [];

        for (var i = $scope.favorites.length - 1; i >= 0; i--) {
          var item = $scope.favorites[i];
          positionData.push({
            id: item.id,
            position: ++position
          });
        }

        favoriteApi
          .updateFavoritePosition(positionData)
          .then(function() {
            //Upate position successful
          }, function() {
            alert("Error while update favorite position");
          });
      }
    }
  }
})();
