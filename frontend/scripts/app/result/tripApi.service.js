(function() {
  'use strict';

  angular
    .module('app.result')
    .service('tripApi', tripApi);

  function tripApi($http, $q, $timeout) {
    var service = this;
    service.findItinerary = findItinerary;
    service.findAlternativeSegment = findAlternativeSegment;

    function findItinerary(searchObject) {
      var deferred = $q.defer();

      $http
        .post('/api/search/trips', searchObject)
        .success(function(response) {
          var data = response[0];
          var result = [];
          for (var i = 0; i < data.length; i++) {
            var itinerary = transformItinerary(data[i]);
            result.push(itinerary);
          }
          deferred.resolve(result);
        })
        .error(function() {
          deferred.reject();
        });

      return deferred.promise;
    }

    function findAlternativeSegment() {
      return $http.get('/api/search/alternatives');
    }

    function transformItinerary(itinerary) {
      var outboundSegments = getObjectValue(itinerary.outbound, 'segments', []);
      var inboundSegments = getObjectValue(itinerary.inbound, 'segments', []);

      itinerary['startTime'] = getItineraryStartTime(itinerary);
      itinerary['endTime'] = getItineraryEndTime(itinerary);
      itinerary['vehicleTypeList'] = getVehicleTypeList(outboundSegments, inboundSegments);
      itinerary['duration'] = getItineraryDuration(outboundSegments, inboundSegments);
      itinerary['cost'] = getItineraryCost(outboundSegments, inboundSegments);

      return itinerary;
    }

    function convertDateStringToDateType(itinerary, outboundSegments, inboundSegments) {
      itinerary.outbound.departureTime = new Date(itinerary.outbound.departureTime);
      itinerary.outbound.arrivalTime = new Date(itinerary.outbound.arrivalTime);

      angular.forEach(outboundSegments, function(item) {
        item.departureTime = new Date(item.departureTime);
        item.arrivalTime = new Date(item.arrivalTime);
      });
      angular.forEach(inboundSegments, function(item) {
        item.departureTime = new Date(item.departureTime);
        item.arrivalTime = new Date(item.arrivalTime);
      });
    }
    function getVehicleTypeList(outboundSegments, inboundSegments) {
      var vehicleTypeList = [];

      angular.forEach(outboundSegments, function(item) {
        if (vehicleTypeList.indexOf(item.type) == -1) {
          vehicleTypeList.push(item.type);
        }
      });

      angular.forEach(inboundSegments, function(item) {
        if (vehicleTypeList.indexOf(item.type) == -1) {
          vehicleTypeList.push(item.type);
        }
      });

      return vehicleTypeList;
    }

    function getItineraryStartTime(itinerary) {
      return getObjectValue(itinerary.outbound, 'departureTime', 0);
    }

    function getItineraryEndTime(itinerary) {
      var arrivalTime = getObjectValue(itinerary.inbound, 'arrivalTime', null);
      if (arrivalTime == null) {
        arrivalTime = getObjectValue(itinerary.outbound, 'arrivalTime', 0);
      }
      return arrivalTime;
    }

    function getItineraryDuration(outboundSegments, inboundSegments) {
      var totalDuration = 0;
      for (var i = 0; i < outboundSegments.length; i++) {
        totalDuration += outboundSegments[i].duration;
      }
      for (var i = 0; i < inboundSegments.length; i++) {
        totalDuration += inboundSegments[i].duration;
      }
      return totalDuration;
    }

    function getItineraryCost(outboundSegments, inboundSegments) {
      var cost = 0;
      for (var i = 0; i < outboundSegments.length; i++) {
        cost += outboundSegments[i].price.amount;
      }
      for (var i = 0; i < inboundSegments.length; i++) {
        cost += inboundSegments[i].price.amount;
      }
      return cost;
    }

    function getObjectValue(object, key, defaultValue) {
      if (!object || !object[key]) {
        return defaultValue;
      }
      return object[key];
    }

  }
})();
