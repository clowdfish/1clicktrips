(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('map', map);

  function map() {
    return {
      require: '^itineraryMap',
      restrict: 'E',
      templateUrl: 'scripts/app/templates/result/map.html',
      scope: {
        activeSegments: '='
      },
      link: link
    };

    function link(scope, element, attrs) {
      var map = null;
      var directionsDisplay = null;
      var directionsService = null;

      var mapOptions = {
        zoom: 19
      };

      scope.$watch('activeSegments', function() {
        if (scope.activeSegments.length >= 1) {
          createMapBySegments(scope.activeSegments);
        }
      });

      function createMapBySegments(segments) {
        if (map == null) {
          map = new google.maps.Map(document.getElementById('itinerary-map'), mapOptions);
        }

        if (directionsDisplay) {
          directionsDisplay.setMap(null);
          directionsDisplay = null;
        }

        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsService = new google.maps.DirectionsService();

        var waypts = [];
        for (var i = 0;i < segments.length; i++) {
          var segment = segments[i];
          console.log(segment);
          waypts.push({
            location: new google.maps.LatLng(segment.end.location.latitude, segment.end.location.longitude),
            stopover: true
          });
        }

        var startSegment = segments[0];
        var endSegment = segments[segments.length - 1];
        var request = {
          origin: new google.maps.LatLng(startSegment.start.location.latitude, startSegment.start.location.longitude),
          destination: new google.maps.LatLng(endSegment.end.location.latitude, endSegment.end.location.longitude),
          waypoints: waypts,
          travelMode: google.maps.DirectionsTravelMode.DRIVING,
          optimizeWaypoints: false
        };

        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var center = map.getCenter();

          } else {
            console.log(response);
          }
        });
      }

    }
  }
})();
