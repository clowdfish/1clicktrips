/// <reference path="../_all.ts" />

module Search {

  'use strict';

  export function routerConfig($stateProvider: angular.ui.IStateProvider) {

    $stateProvider.state('search', {
      url: '/',
      parent: 'root',
      templateUrl: 'app/templates/search/form.html',
      controller: 'searchCtrl',
      resolve: {
        searchFormData: getDefaultSearchFormData
      }
    });
  }

  /**
   * Creates the default search form data without any pre-populated entries.
   *
   * @returns {*}
   */
  function getDefaultSearchFormData() {

    var startDate = new Date();
    startDate.setDate(startDate.getDate() + 10);
    startDate.setHours(14,0);

    return {
      originLocation: null,  // the location data
      destinationLocation: null,  // the location data
      startDate: startDate,
      origin: null, // the location description
      destination: null, // the location description
      targetDate: true
    };
  }
}
