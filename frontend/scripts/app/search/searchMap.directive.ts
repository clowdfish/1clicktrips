/// <reference path="../../_all.ts" />

module Search {

  'use strict';

  export function searchMap(googleMap: Common.GoogleMap) {
    return {
      restrict: 'EA',
      scope: {
        location: '='
      },
      templateUrl: 'scripts/app/templates/search/search-map.html',
      link: link,
      replace: true
    }

    function link(scope, element, attrs) {
      var $element = $(element);
      initializeStaticMap();

      function initializeJavascriptMap() {
        var $container = $('<div class="search-map-image" style="width:720px;height:80px"/>');
        $element.append($container);

        var mapObj = new google.maps.Map($container[0], {
          zoom: 17,
          panControl: true,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false
        });

        scope.$watch('location', () => {
          if (!scope.location) return;
          console.log(scope.location);
          var center = new google.maps.LatLng(scope.location.latitide, scope.location.longitude);
          mapObj.setCenter(center);

          setTimeout(() => {
            google.maps.event.trigger(mapObj, 'resize');
          }, 100);
        });
      }

      function initializeStaticMap() {
        var mapImage:any = $('<img />')
                      .attr('src', null)
                      .attr('width', 720)
                      .attr('height', 80);

        $element.find('.map-view').append(mapImage);

        var innerCircle:any = $element.find('.inner-circle')[0];
        var context = innerCircle.getContext("2d");
        scope.$watch('location', () => {
          if (scope.location) {
            var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?';
            mapUrl += 'center=' + scope.location.latitude + ',' + scope.location.longitude;
            mapUrl += '&size=720x720';
            mapUrl += '&zoom=15';
            mapUrl += '&scale=1';
            mapImage.attr('src', mapUrl);
            mapImage.onload = () => {
              var sx = 300;
              var sy = 300;
              var sw = 110;
              var sh = 110;
              var dx = 0;
              var dy = 0;
              var dw = 110;
              var dy = 110;

              context.drawImage(mapImage, 0, 0);
            }
          }
        });
      }

      function initCanvasMap() {
        var $container = $('<canvas id="search-map-canvas"/>');
        $container.width(720);
        $container.height(80);
        $element.append($container);
        var canvas:any = document.getElementById('search-map-canvas');
        var context = canvas.getContext("2d");
        var imageObj = new Image(720, 80);

        scope.$watch('location', () => {
          if (scope.location) {
            var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?';
            mapUrl += 'center=' + scope.location.latitude + ',' + scope.location.longitude;
            mapUrl += '&size=720x80';
            mapUrl += '&zoom=15';
            mapUrl += '&scale=1';
            imageObj.src = mapUrl;
            imageObj.onload = () => {
              context.drawImage(imageObj, 0, 0);
            }

          }
        });
      }
    }
  }
}