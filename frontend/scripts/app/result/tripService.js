(function() {
  'use strict';

  angular
    .module('app.result')
    .service('tripService', tripService);

  function tripService($http, $q) {
    var service = this;
    service.findItinerary = findItinerary;
    service.findAlternativeSegment = findAlternativeSegment;
    service.callSearchItineraryApi = callSearchItineraryApi;

    function findItinerary() {
      var deferred = $q.defer();
      this.callSearchItineraryApi()
        .then(function(response) {
          var itinerary = transformItinerary(response);
          deferred.resolve(itinerary);
        }, function(){
          deferred.reject('error');
        });
      return deferred.promise;
    }

    function callSearchItineraryApi() {
      var deferred = $q.defer();
      $http.get('/search/trips')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject();
        });
      return deferred.promise;
    }

    function findAlternativeSegment() {
      return $http.get('/search/alternatives');
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
      if (itinerary.outbound.hasOwnProperty('departureTime')) {
        return itinerary.outbound.departureTime;
      }
    }

    function getItineraryEndTime(itinerary) {
      var arrivalTime = getObjectValue(itinerary.inbound, 'arrivalTime', null);
      if (arrivalTime == null) {
        arrivalTime = getObjectValue(itinerary.outbound, 'arrivalTime', null);
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
        cost += outboundSegments[i].price;
      }
      for (var i = 0; i < inboundSegments.length; i++) {
        cost += inboundSegments[i].price;
      }
      return cost;
    }

    function getObjectValue(object, key, defaultValue) {
      var result = object[key];
      if (result == null) {
        return defaultValue;
      } else {
        return result;
      }
    }
  }
})();