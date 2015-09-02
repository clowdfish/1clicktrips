(function() {

  'use strict';

  angular
    .module('app.index')
    .config(routerConfig);

  function routerConfig($stateProvider) {

    $stateProvider.state('index', {
      abstract: true,
      parent: 'root',
      templateUrl: 'scripts/app/templates/index/index.html'
    });

    $stateProvider.state('index.form', {
      url: '/search',
      templateUrl: 'scripts/app/templates/search/search.html',
      controller: 'searchCtrl',
      resolve: {
        searchFormData: getDefaultSearchFormData
      }
    });

    $stateProvider.state('index.file', {
      url: '/',
      template: '<div class="index-dropzone"><dropzone></dropzone></div>',
      controller: 'indexCtrl',
      resolve: { }
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
