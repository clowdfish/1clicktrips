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
      var context = null;
      var mapImage:any = null;
      initializeStaticMap();
      initializeMagnifierDragAndDrop();

      function initializeStaticMap() {
        mapImage =
          $('<img />').attr('src', null);

        $element.find('.map-view').append(mapImage);

        var innerCircle:any = $element.find('.inner-circle')[0];
        context = innerCircle.getContext("2d");

        // render default location
        drawMap($element, mapImage, DEFAULT_LOCATION, context);

        scope.$watch('location', () => {
          drawMap($element, mapImage, scope.location, context);
        });
      }

      function initializeMagnifierDragAndDrop() {
        var $magnifier = $element.find('.magnifier');

        var $container = $('.search-map-container');
        var startDragAndDrop = false;
        var startX = null;

        $container.mousemove((e) => {
          var magnifierWidth = $magnifier.width();
          var magnifierPosition = $magnifier.position();
          var containerWidth = $container.width()
          var pos = e.clientX - $container.offset().left - magnifierWidth / 2;

          if (pos <= 0) {
            pos = 0;
          }
          if (pos + magnifierWidth > containerWidth) {
            pos = containerWidth - magnifierWidth;
          }

          $magnifier.css({
            left: pos
          });
          drawMiniMap(pos);
        });
      }

      /**
      * Draw static Google Maps image.
      *
      * @param mapImage
      * @param location
      * @param context
      */
      function drawMap($element,
                      mapImage,
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
            var left = $element.find('.magnifier').position().left;
            drawMiniMap(left);
          });
        }
      }

      function drawMiniMap(positionX) {
        var sy = 20;
        var sw = 310;
        var sh = 310;
        var dx = 0;
        var dy = 0;
        var dw = 510;
        var dh = 410;
        context.drawImage(mapImage[0], positionX, sy, sw, sh, dx, dy, dw, dh);
      }
    }


  }
}