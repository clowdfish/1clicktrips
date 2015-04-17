(function() {
  'use strict';

  angular
    .module('app.result')
    .service('tripApi', tripApi);

  function tripApi($http, $q, $timeout) {
    var service = this;

    service.findItinerary = findItinerary;
    service.findAlternativeSegment = findAlternativeSegment;
    service.updateItineraryByGroupSegment = updateItineraryByGroupSegment;

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

    function findAlternativeSegment(segmentId, tripId, language, currency) {
      var searchParams = {
        tripId: tripId,
        segmentId: segmentId,
        language: language,
        currency: currency
      };

      return $q(function(resolve, reject) {
        $http
          .get('/api/search/alternatives', {
            params: searchParams
          })
          .success(function(response) {
            resolve(response);
          })
          .error(function(data, status) {
            reject({
              data: data,
              status: status
            });
          });
      });
    }

    function transformItinerary(itinerary) {
      var outboundSegments = getObjectValue(itinerary.outbound, 'segments', []);
      var inboundSegments = getObjectValue(itinerary.inbound, 'segments', []);




      var groupSegment = groupSegmentByDate(itinerary);
      itinerary = updateItineraryByGroupSegment(itinerary, groupSegment);
      return itinerary;
    }

    function updateItineraryByGroupSegment(itinerary, groupSegment) {
      itinerary['groupSegment'] = groupSegment;
      itinerary['duration'] = getItineraryDuration(groupSegment);
      itinerary['cost'] = getItineraryCost(groupSegment);
      itinerary['vehicleTypeList'] = getVehicleTypeList(groupSegment);
      itinerary['startTime'] = getItineraryStartTime(groupSegment);
      itinerary['endTime'] = getItineraryEndTime(groupSegment);
      return itinerary;
    }

    function getVehicleTypeList(groupSegment) {
      var vehicleTypeList = [];

      loopThroughGroupSegment(groupSegment, function(segment) {
        if (segment['type'] && vehicleTypeList.indexOf(segment['type']) === -1) {
          vehicleTypeList.push(segment['type']);
        }
      });

      return vehicleTypeList;
    }

    function getItineraryStartTime(groupSegment) {
      if (_.isUndefined(groupSegment[1])) {
        return;
      }
      return _.first(groupSegment[1]).departureTime;
    }

    function getItineraryEndTime(groupSegment) {
      var keys = _.keys(groupSegment);
      var lastIndex = keys.length;
      if (!_.isUndefined(groupSegment[lastIndex])) {
        return _.last(groupSegment[lastIndex]).arrivalTime;
      }
    }

    function getItineraryDuration(groupSegment) {
      var duration = 0;
      loopThroughGroupSegment(groupSegment, function(segment) {
        if (segment['duration']) {
          duration += segment.duration;
        }
      });
      return duration;
    }

    function getItineraryCost(groupSegment) {
      var cost = 0;
      loopThroughGroupSegment(groupSegment, function(segment) {
        if (segment['price'] && segment['price']['amount']) {
          cost += segment.price.amount;
        }
      });
      return cost;
    }

    function getObjectValue(object, key, defaultValue) {
      if (!object || !object[key]) {
        return defaultValue;
      }
      return object[key];
    }

    /**
    * Handy function to loop through every segment in group segments
    */
    function loopThroughGroupSegment(groupSegment, action) {
      _.each(groupSegment, function(segments) {
        _.each(segments, function(segment) {
          action(segment);
        });
      });
    }

    function groupSegmentByDate(itinerary) {
      var i = 0;
      var result = {};
      var day = 1;
      result[day] = [];

      if (itinerary.outbound && itinerary.outbound.hasOwnProperty('segments')) {
        for (i = 0; i < itinerary.outbound.segments.length; i++) {
          var segment = itinerary.outbound.segments[i];
          segment['tripId'] = itinerary.outbound.id;
          if (result[day] == null) {
            result[day] = [];
          }
          result[day].push(segment);
          if (segment.type == 0) {
            day++
          }
        }
      }

      if (itinerary.inbound && itinerary.inbound.hasOwnProperty('segments')) {
        for (i = 0; i < itinerary.inbound.segments.length; i++) {
          var segment = itinerary.inbound.segments[i];
          segment['tripId'] = itinerary.inbound.id;
          if (result[day] == null) {
            result[day] = [];
          }
          result[day].push(segment);
          if (segment.type == 0) {
            day++
          }
        }
      }
      return result;
    }

  }
})();
