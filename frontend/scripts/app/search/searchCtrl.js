(function() {

  'use strict';

  angular
    .module('app.search')
    .controller('searchCtrl', searchCtrl);

  function searchCtrl($scope, SUGGESTION_TYPES, suggestionAdapter) {
    //Trip destination
    $scope.destination = null;

    //Trip origin
    $scope.origin = null;

    //Active step
    $scope.step = 1;

    //Destination type: address, event, meeting, company...
    $scope.destinationType = SUGGESTION_TYPES.address;

    $scope.destinationTypeArray = suggestionAdapter.getSuggestionType();

    //Show suggestion when typing to address textbox
    $scope.getSuggestion = getSuggestion;

    //Select suggestion
    $scope.selectSuggestion = selectSuggestion;

    $scope.step1 = step1;
    $scope.step2 = step2;

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.showWeeks = false;
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      console.log(1);
      $scope.opened = true;
    };

    /**
    * Get suggestion for text input
    * @param {string} val - input source
    * @return {promise} - return a promise for typeahead
    */
    function getSuggestion(val) {
      console.log('Gest suggestion for text', val,' type:', $scope.destinationType);
      return suggestionAdapter
        .getSuggestion(val, $scope.destinationType);
    }

    /**
    * Select suggestion and display on map
    * @param {object|string} $item - Suggestion object
    */
    function selectSuggestion($item) {
      switch ($scope.destinationType) {
        case SUGGESTION_TYPES.address:
          $scope.destinationAddress = $item.description;
          break;
        case SUGGESTION_TYPES.events:
          $scope.destinationAddress = $item.location;
          break;
        case SUGGESTION_TYPES.meetingSpace:
          $scope.destinationAddress = $item.location;
          break;
      }
    }

    function step1() {
      $scope.step = 1;
    }

    function step2() {
      // if ($scope.destinationAddress == null) {
      //   return;
      // }
      $scope.step = 2;
    }
  }
})();