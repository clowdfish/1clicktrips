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

      var mapImage = $('<img />').attr('src', null);
      var context = element.find('.inner-circle')[0].getContext("2d");
      var hoverActive = true;

      initializeStaticMap($(element), mapImage, context);
      initializeMagnifierDragAndDrop($(element), mapImage, context);

      /**
       * Initialize the static map and add a watch to the location property.
       *
       * @param element
       * @param mapImage
       * @param context
       */
      function initializeStaticMap(element, mapImage, context) {

        element.find('.map-view').append(mapImage);

        // render default location
        drawMap(element, mapImage, DEFAULT_LOCATION, context);

        scope.$watch('location', () => {
          drawMap(element, mapImage, scope.location, context);
        });
      }

      /**
       * Make the magnifier move according to the mouse pointer's position.
       *
       * @param element
       * @param mapImage
       * @param context
       */
      function initializeMagnifierDragAndDrop(element, mapImage, context) {
        var $magnifier = element.find('.magnifier');
        var $container = $('.search-map-container');

        $magnifier.click(() => {
          hoverActive = !hoverActive;
        });

        $container.mousemove((e) => {

          if(hoverActive) {
            var magnifierWidth = $magnifier.width();
            var containerWidth = $container.width();
            var containerHeight = $container.height();

            var xPos = e.clientX - $container.offset().left;
            var yPos = e.clientY - $container.offset().top;

            // check borders for horizontal movement
            if (xPos <= magnifierWidth / 3) {
              xPos = magnifierWidth / 3;
            }
            else if (xPos > containerWidth - magnifierWidth / 3) {
              xPos = containerWidth - magnifierWidth / 3;
            }

            // check borders for vertical movement
            if (yPos <= magnifierWidth / 4) {
              yPos = magnifierWidth / 4;
            }
            else if (yPos > containerHeight - magnifierWidth / 4) {
              yPos = containerHeight - magnifierWidth / 4;
            }

            $magnifier.css({
              left: xPos - magnifierWidth / 2,
              top: yPos - magnifierWidth / 2
            });

            drawMiniMap(xPos - magnifierWidth / 3, yPos - magnifierWidth / 4, mapImage, context);
          }
        });
      }

      /**
      * Draw static Google Maps image.
      *
      * @param element
      * @param mapImage
      * @param location
      * @param context
      */
      function drawMap(element,
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
            var magnifier = element.find('.magnifier');
            var left = magnifier.position().left;
            var top = magnifier.position().top + magnifier.width() / 2;

            drawMiniMap(left, top, mapImage, context);
          });
        }
      }

      /**
       * Draw the map within the magnifier.
       *
       * @param positionX
       * @param positionY
       * @param mapImage
       * @param context
       */
      function drawMiniMap(positionX, positionY, mapImage, context) {
        //var sy = 20;
        var sw = 310;
        var sh = 310;
        var dx = 0;
        var dy = 0;
        var dw = 510;
        var dh = 410;

        context.drawImage(mapImage[0], positionX, positionY, sw, sh, dx, dy, dw, dh);
      }
    }
  }
}