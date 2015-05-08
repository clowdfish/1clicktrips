(function() {
  'use strict';

  angular
    .module('app.result')
    .service('tripApi', tripApi);

  function tripApi($http, $q, $timeout) {
    var service = this;

    /**
    * Find trip api
    */
    service.findItinerary = findItinerary;

    /**
    * Find alternative vehicles
    */
    service.findAlternativeVehiclesSegment = findAlternativeVehiclesSegment;

    /**
    * Find alternative hotels
    */
    service.findAlternativeHotelsSegment = findAlternativeHotelsSegment;

    /**
    * Use group segment to update trip data
    */
    service.updateItineraryByGroupSegment = updateItineraryByGroupSegment;

    /**
    * Replace segment with alternative
    */
    service.replaceSegmentWithAlternatives = replaceSegmentWithAlternatives;

    /**
    * Set hotel
    */
    service.setSegmentHotel = setSegmentHotel;

    /**
    * Remove hotel
    */
    service.unsetSegmentHotel = unsetSegmentHotel;

    function findItinerary(searchObject, additionData) {
      var deferred = $q.defer();

      $http
        .post('/api/search/trips', searchObject, {
          activeMessages: [
            {
              title: 'Create routes',
              time: 1000
            },
            {
              title: 'Retrieve pricing',
              time: 2000
            },
            {
              title: 'Optimize routes',
              time: 1000
            }
          ]
        })
        .success(function(response) {
          var data = response[0];
          var result = [];
          for (var i = 0; i < data.length; i++) {
            var itinerary = transformItinerary(data[i], additionData);
            result.push(itinerary);
          }
          deferred.resolve(result);
        })
        .error(function() {
          deferred.reject();
        });

      return deferred.promise;
    }

    /**
    * Find alternatives vehicle
    */
    function findAlternativeVehiclesSegment(itinerary, segmentId, tripId, language, currency) {
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
          .success(function(alternatives) {
            alternatives = appendTripIdToAlternativeVehicles(alternatives, tripId);
            alternatives = calculateTimeAndPriceDifferent(itinerary, alternatives);
            console.log(alternatives);
            resolve(alternatives);
          })
          .error(function(data, status) {
            reject({
              data: data,
              status: status
            });
          });
      });
    }

    function calculateTimeAndPriceDifferent(itinerary, alternatives) {
      for (var alternativeIndex = 0; alternativeIndex < alternatives.length; alternativeIndex++) {
        var alternative = alternatives[alternativeIndex];
        var alternativePrice = _.sum(alternative.segments, function(item) {
          if (_.has(item, 'price')) {
            return item.price.amount;
          } else {
            //mock data
            return 5;
          }
        });
        var alternativeDuration = _.sum(alternative.segments, function(item) {
          return item.duration;
        });
        var originalSegments = [];
        loopThroughGroupSegment(itinerary.groupSegment, function(segment) {
          if (alternative.replace.indexOf(segment.id) != -1) {
            originalSegments.push(segment);
          }
        });

        var originalPrice = _.sum(originalSegments, function(item) {
          return item.price.amount;
        });

        var originalDuration = _.sum(originalSegments, function(item) {
          return item.duration;
        });

        alternative['differentPrice'] = {
          amount : originalPrice - alternativePrice,
          freezing: originalPrice - alternativePrice < 0
        }

        alternative['differentDuration'] = {
          amount: originalDuration - alternativeDuration,
          freezing: originalDuration - alternativeDuration < 0
        };
      }
      return alternatives;
    }

    /**
    * Because alternatives data from server doesn't have tripId,
    * we have to append tripId to alternatives segments so we can search for another alternatives later
    * @params Array - alternatives data
    * @params string - Trip Id
    * @returns Array - alternatives with tripId in each segments
    */
    function appendTripIdToAlternativeVehicles(alternatives, tripId) {
      for (var alternativeIndex = 0; alternativeIndex < alternatives.length; alternativeIndex++) {
        var alternative = alternatives[alternativeIndex];
        for (var segmentIndex = 0; segmentIndex < alternative.segments.length; segmentIndex++) {
          alternative.segments[segmentIndex]['tripId'] = tripId;
        }
      }
      return alternatives;
    }

    /**
    * Find alternative hotels
    */
    function findAlternativeHotelsSegment(segmentId, tripId, language, currency) {
      var searchParams = {
        tripId: tripId,
        segmentId: segmentId,
        language: language,
        currency: currency
      };

      return $q(function(resolve, reject) {
        $http
          .get('/api/search/alternative-hotels', {
            params: searchParams
          })
          .success(function(alternatives) {
            resolve(alternatives);
          })
          .error(function(data, status) {
            reject({
              data: data,
              status: status
            });
          });
      });
    }

    function replaceSegmentWithAlternatives(itinerary, groupNumber, alternative) {
      var activeSegments = itinerary.groupSegment[groupNumber];
      var lastIndex = _.findIndex(activeSegments, function(item) {
        return item.id == alternative.replace[0];
      });
      if (lastIndex === -1) {
        return itinerary;
      }
      var newActiveSegments = insertAt(activeSegments, alternative.segments, lastIndex);
      newActiveSegments = _.reject(newActiveSegments, function(item) {
        return alternative.replace.indexOf(item.id) !== -1;
      });
      itinerary.groupSegment[groupNumber] = newActiveSegments;
      itinerary = updateItineraryByGroupSegment(itinerary);
      return itinerary;
    }

    function setSegmentHotel(itinerary, segment, hotel) {
      for (var key in itinerary.groupSegment) {
        var groupSegment = itinerary.groupSegment[key];
        for (var i = 0; i < itinerary.groupSegment[key].length; i++) {
          var item = itinerary.groupSegment[key][i];
          if (item.id === segment.id) {
            item['hotel'] = hotel;
            itinerary.groupSegment[key][i] = item;
          }
        }
      }

      itinerary['cost'] = getItineraryCost(itinerary.groupSegment);
      return itinerary;
    }

    function unsetSegmentHotel(itinerary, segment) {
      for (var key in itinerary.groupSegment) {
        var groupSegment = itinerary.groupSegment[key];
        for (var i = 0; i < itinerary.groupSegment[key].length; i++) {
          var item = itinerary.groupSegment[key][i];
          if (item.id === segment.id) {
            delete item['hotel'];
            itinerary.groupSegment[key][i] = item;
          }
        }
      }
      itinerary['cost'] = getItineraryCost(itinerary.groupSegment);
      return itinerary;
    }

    /**
    * Insert array2 into array1 at index position
    * @params {Array} array1 - Array which will contain the insertment array
    * @params {Array} array2 - Array which will be inserted into array1
    * @params {int} index - Position to insert array2 into array1
    * @return {Array} new array
    */
    function insertAt(array1, array2, index) {
      var origin = _.clone(array1);
      var end = origin.splice(index);
      return origin.concat(array2, end);
    }

    function transformItinerary(itinerary, searchObject) {
      var outboundSegments = getObjectValue(itinerary.outbound, 'segments', []);
      var inboundSegments = getObjectValue(itinerary.inbound, 'segments', []);
      var groupSegment = groupSegmentByDate(itinerary);
      itinerary['groupSegment'] = groupSegment;
      itinerary = updateItineraryByGroupSegment(itinerary, groupSegment);
      itinerary['startDate'] = searchObject.startDate;
      itinerary['endDate'] = searchObject.endDate;
      itinerary['origin'] = searchObject.origin;
      itinerary['destination'] = searchObject.destination;

      return itinerary;
    }

    /**
    * Collect data from group segments and update to itinerary
    * @params {Object} itinerary - Itinerary object
    * @params {Object} groupSegment
    * @return {Object} itinerary - Itinerary is updated by data from groupSegment
    */
    function updateItineraryByGroupSegment(itinerary) {
      var groupSegment = itinerary.groupSegment;
      itinerary['groupSegment'] = groupSegment;
      itinerary['duration'] = getItineraryDuration(groupSegment);
      itinerary['cost'] = getItineraryCost(groupSegment);
      itinerary['vehicleTypeList'] = getVehicleTypeList(groupSegment);
      itinerary['startTime'] = getItineraryStartTime(groupSegment);
      itinerary['endTime'] = getItineraryEndTime(groupSegment);
      return itinerary;
    }

    /**
    * Get vehicle number array from group segments
    * @params {Object} groupSegment
    * @returns {Array} array of vehicle number
    */
    function getVehicleTypeList(groupSegment) {
      var vehicleTypeList = [];

      loopThroughGroupSegment(groupSegment, function(segment) {
        if (segment['type'] && vehicleTypeList.indexOf(segment['type']) === -1) {
          vehicleTypeList.push(segment['type']);
        }
      });

      return vehicleTypeList;
    }

    /**
    * Get departure time of the first segment in group segments
    */
    function getItineraryStartTime(groupSegment) {
      if (_.isUndefined(groupSegment[1])) {
        return;
      }
      return _.first(groupSegment[1]).departureTime;
    }

    /**
    * Get arrival time of last segment in group segments
    */
    function getItineraryEndTime(groupSegment) {
      var keys = _.keys(groupSegment);
      var lastIndex = keys.length;
      if (!_.isUndefined(groupSegment[lastIndex])) {
        return _.last(groupSegment[lastIndex]).arrivalTime;
      }
    }

    /**
    * Sum of duration in group segments
    */
    function getItineraryDuration(groupSegment) {
      var duration = 0;
      loopThroughGroupSegment(groupSegment, function(segment) {
        if (segment['duration']) {
          duration += segment.duration;
        }
      });
      return duration;
    }

    /**
    * Sum of price in group segments
    */
    function getItineraryCost(groupSegment) {
      var cost = 0;
      loopThroughGroupSegment(groupSegment, function(segment) {
        if (segment['price'] && segment['price']['amount']) {
          cost += segment.price.amount;
        }

        if (segment['hotel']) {
          cost += segment.hotel.price;
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

    /**
     * Group segment by day.
     * REMARK: For now, it won't group it by day but by inbound and outbound.
     * See the commented part for further information
     */
    function groupSegmentByDate(itinerary) {
      var i = 0;
      var result = {};
      var day = 1;
      result[day] = [];

      var segment;

      if (itinerary.outbound && itinerary.outbound.hasOwnProperty('segments')) {
        for (i = 0; i < itinerary.outbound.segments.length; i++) {
          segment = itinerary.outbound.segments[i];
          segment['tripId'] = itinerary.outbound.id;

          if (result[day] == null) {
            result[day] = [];
          }

          result[day].push(segment);

          // This part will put the segments into different groups based on days
          //if (segment.type == 0) day++;
        }
      }

      if (itinerary.inbound && itinerary.inbound.hasOwnProperty('segments')) {
        // increase day variable to create different groups in result screen
        day++;

        for (i = 0; i < itinerary.inbound.segments.length; i++) {
          segment = itinerary.inbound.segments[i];
          segment['tripId'] = itinerary.inbound.id;
          segment['bookable'] = true;

          if (result[day] == null) {
            result[day] = [];
          }

          result[day].push(segment);

          // This part will put the segments into different groups based on days
          //if (segment.type == 0) day++;
        }
      }
      return result;
    }

  }
})();
