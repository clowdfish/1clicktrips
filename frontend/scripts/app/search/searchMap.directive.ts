/// <reference path="../../_all.ts" />

module Search {

  'use strict';

  export function searchMap(DEFAULT_LOCATION) {
    return {
      restrict: 'EA',
      scope: {
        location: '='
      },
      templateUrl: 'scripts/app/templates/search/search-map.html',
      link: link
    };

    function link(scope, element, attrs) {
      var $element = $(element);
      initializeStaticMap();

      function initializeStaticMap() {
        var mapImage:any =
          $('<img />').attr('src', null);

        $element.find('.map-view').append(mapImage);

        var innerCircle:any = $element.find('.inner-circle')[0];
        var context = innerCircle.getContext("2d");

        // render default location
        drawMap(mapImage, DEFAULT_LOCATION, context);

        scope.$watch('location', () => {
          drawMap(mapImage, scope.location, context);
        });
      }
    }

    /**
     * Draw static Google Maps image.
     *
     * @param mapImage
     * @param location
     * @param context
     */
    function drawMap(mapImage,
                     location:any,
                     context) {

      if (location && location.longitude && location.latitude) {
        var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?';
        mapUrl += 'center=' + location.latitude + ',' + location.longitude;
        mapUrl += '&size=880x120';
        mapUrl += '&zoom=10'; // 15
        mapUrl += '&scale=2'; // 2

        mapImage.attr('src', mapUrl);
        mapImage.load(() => {
          var sx = 20;
          var sy = 20;
          var sw = 210;
          var sh = 210;
          var dx = 0;
          var dy = 0;
          var dw = 410;
          var dh = 410;
          context.drawImage(mapImage[0], sx, sy, sw, sh, dx, dy, dw, dh);
        });
      }
    }
  }
}