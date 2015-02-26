(function() {

  'use strict';

  angular
    .module('app.search')
    .controller('searchCtrl', searchCtrl);

  function searchCtrl($scope, 
                      $state, 
                      $q,
                      $timeout,
                      SUGGESTION_TYPES, 
                      suggestionAdapter, 
                      $document, 
                      $location, 
                      googleMap
                      ) {
    var favoriteOriginLocation = null;
    $scope.isLogin = true;
    $scope.isOpenStartDatePicker = false;

    //Trip destination
    $scope.destination = null;

    //Trip origin
    $scope.origin = null;

    //Active step
    $scope.step = 1;

    //Destination type: address, event, meeting, company...
    $scope.destinationType = SUGGESTION_TYPES.address;
    $scope.setDestinationType = setDestinationType;

    $scope.destinationTypeArray = suggestionAdapter.getSuggestionType();

    //Show suggestion when typing to address textbox
    $scope.getSuggestion = getSuggestion;
    $scope.getAddressSuggestion = getAddressSuggestion;

    //Select suggestion
    $scope.selectDestinationSuggestion = selectDestinationSuggestion;
    $scope.selectOriginSuggestion = selectOriginSuggestion;

    //Select step functions
    $scope.step1 = step1;
    $scope.step2 = step2;
    $scope.step3 = step3;

    //Start search function
    $scope.startSearch = startSearch;

    //User select favorite event
    $scope.$on('selectFavorite', function(e, favorite) {
      selectFavorite(favorite);
    });

    function selectFavorite(favorite) {
      step1();
      $scope.destination = favorite.destination.description;
      $scope.destinationAddress = favorite.destination.location;

      $scope.origin = favorite.origin.description;
      favoriteOriginLocation = favorite.origin.location;
    }

    $scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 0
    };

    // configure date picker
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.showWeeks = false;

    $scope.openStartDatePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      closeAll();
      $scope.isOpenStartDatePicker = true;
    };

    $scope.openEndDatePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      closeAll();
      $scope.isOpenEndDatePicker = true;
    };

    $scope.openStartTimePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      closeAll();
      $scope.isOpenStartTimePicker = true;
    };

    $scope.closeStartTimePicker = function($event) {
      $scope.isOpenStartTimePicker = false;
    };

    $scope.openEndTimePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      closeAll();
      $scope.isOpenEndTimePicker = true;
    };

    $scope.closeEndTimePicker = function($event) {
      $scope.isOpenEndTimePicker = false;
    };

    function setDestinationType(item) {
        $scope.destinationType = item;
    }

    /**
     * Close all open date or time pickers
     */
    function closeAll() {
      $scope.isOpenStartDatePicker = false;
      $scope.isOpenStartTimePicker = false;
      $scope.isOpenEndDatePicker = false;
      $scope.isOpenEndTimePicker = false;
    }

    /**
    * Get suggestion for text input
    * @param {string} val - input source
    * @return {promise} - return a promise for typeahead
    */
    function getSuggestion(val) {
      return suggestionAdapter
              .getSuggestion(val, $scope.destinationType);
    }

    /**
    * Get suggestion for address only
    * @param {string} val - input
    * @return {promise} - return a promise for typeahead
    */
    function getAddressSuggestion(val) {
      return  suggestionAdapter
                .getSuggestion(val, SUGGESTION_TYPES.address);

    }

    /**
    * Select suggestion and display on map
    * @param {object|string} $item - Suggestion object
    */
    function selectSuggestion($item) {
      var deferred = $q.defer();
      switch ($scope.destinationType) {
        case SUGGESTION_TYPES.address:          
          googleMap
            .geocode($item.description)
            .then(function(location) {
              deferred.resolve(location);
            });
          break;
        case SUGGESTION_TYPES.events:
          deferred.resolve($item.location);
          break;
        case SUGGESTION_TYPES.meetingSpace:
          deferred.resolve($item.location);
          break;
        default:
          deferred.reject();
      }
      return deferred.promise;
    }

    function selectDestinationSuggestion($item) {
      selectSuggestion($item).then(function(location) {
        $scope.destinationAddress = location;
      });
    }

    function selectOriginSuggestion($item) {
      $scope.originAddress = selectSuggestion($item);
    }

    function step1() {
      $scope.step = 1;
    }

    function step2() {
      if ($scope.destinationAddress == null) {
        return;
      }

      $scope.step = 2;
        
    }

    function step3() {
      if ($scope.startDate == null || 
        $scope.endDate == null ||
        $scope.startTime == null || 
        $scope.endTime == null) {
        return;
      }

      $scope.step = 3;
      
      $timeout(function() {
        if ($scope.origin && favoriteOriginLocation) {
          $scope.originAddress = favoriteOriginLocation;
        }
      }, 50);

    }

    $scope.$watchGroup(['startDate', 'startTime', 'endDate', 'endTime'], function() {
      console.log($scope.startDate, $scope.startTime, $scope.endDate, $scope.endTime);
    });

    /**
     * @todo implement
     */
    function startSearch() {
      $state.go('search_result', {
        originLatitude: 1,
        originLongitude: 1,
        destinationLatitude: 1,
        destinationLongitude: 1,
        startTime: 1,
        endTime: 1
      });
    }
  }
})();