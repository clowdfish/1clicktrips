// controller/searchController.js

var Promise = require('es6-promise').Promise;
var Config = require('../../config/general');

var SearchEngine = require('ttg-search');
var SearchApi = SearchEngine.SearchApi;

// handle different timezones?
var disableTimezones = true;
var searchApi = new SearchApi(disableTimezones, Config.logLocation);

module.exports = {

  getEvents: function(filter, limit) {
    console.log("Retrieving events. Limit=" + limit);

    // TODO implement

    return new Promise(function(resolve) {
      resolve([]);
    });
  },

  getMeetingSpaces: function(filter, limit) {
    console.log("Retrieving meeting spaces. Limit=" + limit);

    // TODO implement

    return new Promise(function(resolve) {
      resolve([]);
    });
  },

  getAlternatives: function(tripId, segmentId, language, currency) {
    console.log("Retrieving trip alternatives.");

    return new Promise(function(resolve, reject) {

      // API request
      searchApi.getSegmentAlternatives(tripId, segmentId, language, currency)
        .then(function(alternatives) {
          resolve(alternatives);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  },

  getTripResults: function(searchObject, userLicence) {
    console.log("Retrieving trip results.");

    return new Promise(function(resolve, reject) {

      // Rome2Rio API request
      searchApi.search(searchObject, 0, userLicence)
        .then(function(itineraries) {
          resolve(itineraries);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
};