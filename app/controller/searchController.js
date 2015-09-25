// controller/searchController.js

var Promise = require('es6-promise').Promise;
var Config = require('../../config/general');

var SearchEngine = require('ttg-search');
var SearchApi = SearchEngine.SearchApi;

var MockController = require('../mocking/searchController');

// handle different timezones?
var disableTimezones = false;
var searchApi = new SearchApi(disableTimezones, Config.logLocation);

module.exports = {

  getEvents: function(filter, limit) {
    console.log("Retrieving mock events. Limit=" + limit);

    // TODO implement

    return MockController.getEvents(filter, limit);
  },

  getMeetingSpaces: function(filter, limit) {
    console.log("Retrieving mock meeting spaces. Limit=" + limit);

    // TODO implement

    return MockController.getMeetingSpaces(filter, limit);
  },

  getHotels: function(searchObject) {
    console.log("Retrieving hotels.");

    return new Promise(function(resolve, reject) {

      // search engine API request
      searchApi.getAccommodations(searchObject)
        .then(function(hotels) {
          resolve(hotels);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  },

  getTripResults: function(searchObject, userLicence) {
    console.log("Retrieving trip alternatives.");

    return new Promise(function(resolve, reject) {

      // search engine API request
      searchApi.getTrips(searchObject, userLicence)
        .then(function(itineraries) {
          resolve(itineraries);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },

  getTripUpdate: function(searchObject, userLicence) {
    console.log("Retrieving trip update.");

    return new Promise(function(resolve, reject) {

      // search engine API request
      searchApi.getTripUpdate(searchObject, userLicence)
        .then(function(itinerary) {
          resolve(itinerary);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },

  getTripDetails: function(searchObject, userLicence) {
    console.log("Retrieving trip details.");

    return new Promise(function(resolve, reject) {

      // search engine API request
      searchApi.getTripDetails(searchObject, userLicence)
        .then(function(itinerary) {
          resolve(itinerary);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
};
