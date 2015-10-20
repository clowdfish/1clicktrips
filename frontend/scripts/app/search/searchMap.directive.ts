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
      link: link
    }

    function link(scope, element, attrs) {
      var $element = $(element);
      initializeStaticMap();

      function initializeStaticMap() {
        var mapImage:any = $('<img />')
                      .attr('src', null);

        $element.find('.map-view').append(mapImage);

        var innerCircle:any = $element.find('.inner-circle')[0];
        var context = innerCircle.getContext("2d");

        scope.$watch('location', () => {
          if (scope.location) {
            var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?';
            mapUrl += 'center=' + scope.location.latitude + ',' + scope.location.longitude;
            mapUrl += '&size=720x720';
            mapUrl += '&zoom=15';
            mapUrl += '&scale=2';
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
        });
      }
    }
  }
}