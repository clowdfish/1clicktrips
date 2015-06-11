(function() {
  'use strict';

  angular
    .module('app.common')
    .filter('segmentInformation', segmentInformation);

  function segmentInformation($translate) {

    return function(details, segmentType, showLogo) {

      var detailsString = "";

      // flight segments
      if(segmentType == 16) {
        var logoUrl = "<img src='" + details['flightNumbers'][0]['carrier'].imageUrl + "'>";
        var providerName = details['flightNumbers'][0]['carrier'].name;
        var flightNumber = details['flightNumbers'][0]['flightNumber'];

        if(showLogo) {
          detailsString += logoUrl;
        }

        detailsString += providerName + ", " + $translate.instant('general_flight') + " " + flightNumber;
      }

      // public transport
      if(segmentType >= 4 && segmentType <=8){

      }

      // other formatters can be added here

      return detailsString;
    }
  }
})();
