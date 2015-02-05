(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('itineraryMap', itineraryMap);

  function itineraryMap() {
    return {
      restrict: 'E',
      templateUrl: 'js/templates/result/itinerary-map.html',
      scope: {
        itinerary: '=',
        refreshItinerary: '='
      },
      link: link
    };

    function link(scope, element, attrs) {
      var isInit = false;
      var map = null;
      var directionsDisplay = null;
      var directionsService = null;

      scope.showTab = showTab;
      scope.showSegmentHotels = showSegmentHotels;
      scope.closeHotelPanel = closeHotelPanel;
      scope.selectHotel = selectHotel;

      scope.$watch('itinerary', function() {
        if (scope.itinerary != null && false == isInit) {
          isInit = true;
          init();
        }
      });

      function init() {
        scope.segments = groupSegmentByDate(scope.itinerary);
        scope.segmentsHeaders = _.keys(scope.segments);
        if (scope.segments.length == 0) {
          console.log("Invalid segments data");
          return;
        } else {
          scope.activeSegment = 1;
        }
        var mapOptions = {
          zoom: 19,
          center: new google.maps.LatLng(10.802749, 106.655670)
        };
        map = new google.maps.Map(document.getElementById('itinerary-map'),
            mapOptions);

        createMapBySegments(scope.itinerary, scope.segments[1]);
      }

      function createMapBySegments(itinerary, segments) {
        directionsDisplay = new google.maps.DirectionsRenderer();

        directionsDisplay.setMap(map);
        directionsService = new google.maps.DirectionsService();
        var waypts = [];
        for (var i = 0;i < segments.length; i++) {
          var segment = segments[i];
          waypts.push({
            location: new google.maps.LatLng(segment.destination.latitude, segment.destination.longitude),
            stopover: true
          });
        }

        var startSegment = segments[0];
        var endSegment = segments[segments.length - 1];
        var request = {
          origin: new google.maps.LatLng(startSegment.origin.latitude, startSegment.origin.longitude),
          destination: new google.maps.LatLng(endSegment.destination.latitude, endSegment.destination.longitude),
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

      function groupSegmentByDate(itinerary) {
        var i = 0;
        var result = {};
        var day = 1;
        result[day] = [];

        if (itinerary.outbound.hasOwnProperty('segments')) {
          for (i = 0; i < itinerary.outbound.segments.length; i++) {
            var segment = itinerary.outbound.segments[i];
            if (result[day] == null) {
              result[day] = [];
            }
            result[day].push(segment);
            if (segment.type == 0) {
              day++
            }

          }
        }

        if (itinerary.inbound.hasOwnProperty('segments')) {
          for (i = 0; i < itinerary.inbound.segments.length; i++) {
            var segment = itinerary.inbound.segments[i];
            if (result[day] == null) {
              result[day] = [];
            }
            result[day].push(segment);
            if (segment.type == 0) {
              day++
            }
          }
          console.log(result);
        }

        return result;
      }

      function showTab(segmentNumber) {
        scope.activeSegment = segmentNumber;
        directionsDisplay.setMap(null);
        directionsDisplay = null;
        createMapBySegments(scope.itinerary, scope.segments[segmentNumber]);
      }

      function showSegmentHotels(segment) {
        if (typeof(segment['hotels']) != 'undefined' && segment.hotels.length > 0) {
          scope.hotels = segment.hotels;
          scope.showHotelPanel = true;
        } else {
          scope.hotels = [];
          scope.showHotelPanel = false;
        }
      }

      function closeHotelPanel() {
        scope.showHotelPanel = false;
      }

      function selectHotel(segment, hotel) {
        console.log('Selected hotel ', hotel.name);
      }
    }
  }
})();