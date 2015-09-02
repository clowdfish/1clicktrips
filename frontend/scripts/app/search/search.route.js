(function() {

  'use strict';

  angular
    .module('app.search')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    //$urlRouterProvider.otherwise('search');

    $stateProvider.state('search', {
      url: '/search',
      parent: 'root',
      templateUrl: 'scripts/app/templates/search/search.html',
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

    var startDateObject = moment(startDate);
    var startTimeString = "14:00";

    return {
      originLocation: null,  // the location data
      destinationLocation: null,  // the location data
      startDate: startDateObject,
      origin: null, // the location description
      destination: null, // the location description
      startTimeString: startTimeString,
      targetDate: true
    };
  }
})();
