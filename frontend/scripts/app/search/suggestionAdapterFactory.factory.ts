/// <reference path="../../_all.ts" />

module Search {

	'use strict';
	
	export class SuggestionAdapterFactory {

		suggestionAdapter: SuggestionAdapter;

		constructor(suggestionAdapter: SuggestionAdapter) {
			this.suggestionAdapter = suggestionAdapter;
		}
		
		getInstance() {
			return {
				getAddressSuggestion: (address) => this.suggestionAdapter.getAddressSuggestion(address)
			}
		}
	}
}