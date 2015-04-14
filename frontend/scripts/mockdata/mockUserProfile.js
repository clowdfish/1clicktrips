(function() {

  'use strict';

  angular
    .module('mockdata')
    .value('mockUserProfile', {
      "id":2,
      "company_name":"1ClickTrips",
      "first_name":"1Click",
      "last_name":"Trips",
      "street":"Highway 42",
      "address_other":"Hidden Address",
      "zip_code":"700000",
      "image":null
    })
})();
