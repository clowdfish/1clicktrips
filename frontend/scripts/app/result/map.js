(function() {

  'use strict';

  angular
    .module('app.result')
    .directive('map', map);

  function map($q) {
    return {
      require: '^itineraryMap',
      restrict: 'E',
      scope: {
        activeSegments: '=',
        selectedSegment: '='
      },
      link: link
    };

    function link(scope, element, attrs) {
      console.log('Create map directive');
      var $element = $(element);

      //Is this directive initialize
      scope.isInitialize = false;

      //Map object
      var map = null;

      //jQuery map object
      var $map;

      //Map data
      var latlngs = new google.maps.MVCArray(),
          displayPath,
          markers = [],
          mapBounds;

      var locationIcon = {
        url: 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png'
      };

      scope.$watch('activeSegments', function() {
        if (!scope.activeSegments ||
          scope.activeSegments.length == 0) {
          return false;
        }

        if (!scope.isInitialize) {
          initialize();
          scope.isInitialize = true;
        }

        drawPolylineOnMap(scope.activeSegments);


        setTimeout(function() {
          google.maps.event.trigger(map, 'resize');
          map.fitBounds(mapBounds);
        }, 100);

      });

      scope.$watch('selectedSegment', function() {
        var segment = scope.selectedSegment;
        if (scope.selectedSegment != null) {
          zoomSegment(scope.selectedSegment);

        } else if (scope.isInitialize) {
          map.fitBounds(mapBounds);
          drawPolylineOnMap(scope.activeSegments);
        }
      });

      scope.$watch('$destroy', function() {
        cleanupMap();
      });

      /**
       * Zoom the whole path of a segment
       * @param  {Object} segment - Segment data
       * @return null
       */
      function zoomSegment(segment) {
        var bounds = new google.maps.LatLngBounds();
        if (segment.path != '') {
          var decodedPath = google.maps.geometry.encoding.decodePath(segment.path)
          for (var i = 0; i < decodedPath.length; i++) {
            var location = new google.maps.LatLng(decodedPath[i].lat().toFixed(5),
                                                  decodedPath[i].lng().toFixed(5));
            bounds.extend(location)
          }
        } else {
          bounds.extend(new google.maps.LatLng(segment.start.location.latitude,
                                              segment.start.location.longitude));
          bounds.extend(new google.maps.LatLng(segment.end.location.latitude,
                                              segment.end.location.longitude));
        }
        map.fitBounds(bounds);
      }

      /**
       * Cleanup map data after directive is destroyed
       */
      function cleanupMap() {
        if (scope.isInitialize) {
          console.log('Cleanup map');
          mapBounds = null;
          latlngs.clear();
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
          displayPath.setMap(null);
          $map.remove();
        }

      }

      function initialize() {
        console.log('Initialize map');
        $element.append('<div id="itinerary-map"></div>')
        $map = $element.find('#itinerary-map');
        var center = new google.maps.LatLng(scope.activeSegments[0].start.location.latitude,
                                          scope.activeSegments[0].end.location.longitude);

        map = new google.maps.Map(document.getElementById('itinerary-map'), {
          zoom: 19,
          center: center
        });

        displayPath = new google.maps.Polyline({
          map: map,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          path: latlngs
        });
      }

      function drawPolylineOnMap(segments) {
        if (segments.length == 0) {
          return false;
        }
        //Clear old path
        latlngs.clear();
        displayPath.setPath(latlngs);

        mapBounds = new google.maps.LatLngBounds();

        for (var segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
          //Create marker for segment
          var marker = createSegmentMarker(segments[segmentIndex].start.location.latitude,
                              segments[segmentIndex].start.location.longitude);
          markers.push(marker);

          var path = segments[segmentIndex].path;

          if (path != '') {
            var decodedPath = google.maps.geometry.encoding.decodePath(path)
            for (var i = 0; i < decodedPath.length; ++i) {
              addPathLocation(decodedPath[i].lat().toFixed(5),
                          decodedPath[i].lng().toFixed(5));
            }
          } else {
            //For flight segment, we only have start and end points
            addPathLocation(segments[segmentIndex].start.location.latitude,
                        segments[segmentIndex].start.location.longitude);
            addPathLocation(segments[segmentIndex].end.location.latitude,
                        segments[segmentIndex].end.location.longitude);
          }

        }

      }

      function addPathLocation(lat, lng) {
        var newLocation = new google.maps.LatLng(lat, lng);
        latlngs.push(newLocation);
        mapBounds.extend(newLocation);
        displayPath.setPath(latlngs);
      }

      function createSegmentMarker(lat, lng) {
        var locationMarker = new google.maps.Marker();

        locationMarker.setOptions({
          icon: locationIcon,
          draggable: false,
          map: map,
          position: new google.maps.LatLng(lat, lng)
        });

        return locationMarker;
      }

    }
  }
})();
