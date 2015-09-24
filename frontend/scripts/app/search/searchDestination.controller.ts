/// <reference path="../../_all.ts" />

module Search {

	'use strict';

	export class SearchDestinationFormCtrl {
    constructor(private $scope,
                private $q,
                private suggestionAdapter,
                private googleMap) {
      $scope.getSuggestion = this.getSuggestion;
  		$scope.selectDestinationSuggestion = this.selectDestinationSuggestion;
  
      $scope.$watch('destination', (destination) => {
        if (_.isEmpty(destination)) {
          this.setDestination(null);
        }
      });              
    }

    /**
     *
     *
     * @param options
     */
    setDestination = (options) => {

      if(options == null) {
        this.$scope.$parent.schedule.destinationAddress = null;
        this.$scope.$parent.schedule.destination = null;
      }
      else {
        this.$scope.$parent.schedule.destinationAddress = options.description;
        this.$scope.$parent.schedule.destination = options.location;
      }
    };

    /**
     * Get suggestion for text input.
     *
     * @param {string} val - input source
     * @return {promise} - return a promise for typeahead
     */
    getSuggestion = (val) => {

      return this
        .suggestionAdapter
        .getAddressSuggestion(val);
    };

    /**
     * Select suggestion and display on map.
     *
     * @param {object|string} $item - Suggestion object
     */
    selectSuggestion = ($item) => {

      var deferred = this.$q.defer();

      this
        .googleMap
        .geocode($item.description)
        .then((location) => {
          deferred.resolve(location);
        });

      return deferred.promise;
    };

    /**
     *
     *
     * @param $item
     */
    selectDestinationSuggestion = ($item) => {

      return this.selectSuggestion($item).then((location) => {

        this.setDestination({
          description: this.$scope.destination,
          location: location
        });

        return this.focusOnTimeSelection();
      }, () => {
      	return this.setDestination(null);
      });
    };

    /**
     *
     */
    focusOnTimeSelection = () => {

    };
	}
}
