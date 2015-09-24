module Search {

	'use strict';

	export class SearchOriginCtrl {
    
    public static $inject = [
      '$scope',
      'suggestionAdapter',
      'googleMap'
    ];
    
    private suggestionAdapter: SuggestionAdapter;
    
    constructor(private $scope,
                suggestionAdapter: SuggestionAdapter,
                private googleMap) {
      $scope.getAddressSuggestion = this.getAddressSuggestion;
      $scope.selectOriginSuggestion = this.selectOriginSuggestion;
      this.suggestionAdapter = suggestionAdapter;      
      $scope.$watch('origin', (origin) => {
        if (_.isEmpty(origin)) {
          this.setOrigin(null);
        }
      });              
    }

    /**
     *
     *
     * @param options
     */
    setOrigin = (options) => {

      if(options == null) {
        this.$scope.$parent.schedule.originAddress = null;
        this.$scope.$parent.schedule.origin = null;
      }
      else {
        this.$scope.$parent.schedule.originAddress = options.address;
        this.$scope.$parent.schedule.origin = options.location;
      }
    }

    /**
     * Get suggestion for address
     * @param {string} val - input
     * @return {promise} - return a promise for typeahead
    */
    getAddressSuggestion = (val) => {
      return this.suggestionAdapter.getAddressSuggestion(val);
    };

    /**
     *
     *
     * @param $item
     */
    selectOriginSuggestion = ($item) => {
      return this.googleMap
      	.geocode($item.description)
      	.then((location) => {

          this.setOrigin({
            address: this.$scope.origin,
            location: location
          });

          this.focusOnDestinationField();
      	}, () => {
          this.setOrigin(null);
      	});
    };

    /**
     *
     */
    focusOnDestinationField = () => {

    };
	}
}
