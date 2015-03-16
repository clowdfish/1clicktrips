(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('map', map);

  function map($q) {
    return {
      require: '^itineraryMap',
      restrict: 'E',
      templateUrl: 'scripts/app/templates/result/map.html',
      scope: {
        activeSegments: '=',
        selectedSegment: '='
      },
      link: link
    };

    function link(scope, element, attrs) {
      scope.isMapReady = false;
      var map = null;
      var directionsDisplay = null;
      var directionsService = null;

      var mapOptions = {
        zoom: 19
      };

      scope.$watch('activeSegments', function() {
        if (scope.activeSegments.length >= 1) {
          map = new google.maps.Map(document.getElementById('itinerary-map'), mapOptions);
          createMapBySegments(scope.activeSegments, function() {

          });
          scope.isMapReady = true;
        }
      });

      scope.$watch('selectedSegment', function() {
        var segment = scope.selectedSegment;
        if (scope.selectedSegment != null) {
          var location = new google.maps.LatLng(segment.start.location.latitude, segment.start.location.longitude);
          map.panTo(location);
          map.setZoom(15);
        } else {
          createMapBySegments(scope.activeSegments, function() {
            scope.isMapReady = true;
          });
        }
      });

      scope.selectSegment = selectSegment;

      function createMapBySegments(segments, callback) {
        callback = callback || function() {};

        if (segments.length == 0) {
          return;
        }

        if (directionsDisplay) {
          directionsDisplay.setMap(null);
          directionsDisplay = null;
        }

        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsService = new google.maps.DirectionsService();

        var waypts = [];
        for (var i = 0; i < segments.length; i++) {
          var segment = segments[i];
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
            google.maps.event.trigger(map, 'resize');
          } else {
            console.log('this route can not be shown.', response, status);
          }
        });

      }

      //Handler for segment click event
      function selectSegment(segment) {
        //zoom on the origin

      }

    }
  }
})();
