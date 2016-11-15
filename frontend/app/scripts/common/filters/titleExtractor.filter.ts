/// <reference path="../../_all.ts" />

module Common {
  
  'use strict';

  /**
  * Convert an itinerary into a route title
  */
  export function titleExtractor($translate) {

    return function(itinerary:any) {

      var resultString = itinerary['segmentsContainer'].filter(function(segment) {
        return segment['isMajor'] === 1;
      }).map(function(container) {
        return container['alternatives'][0];
      }).map(function(segments) {
        return $translate.instant(actionConverter(segments[0]['type'])) + " " +
          $translate.instant("general.from") + " " + segments[0]['start']['description'] + " " +
          $translate.instant("general.to") + " " + segments[0]['end']['description'];
      }).join(', ');

      if(resultString.charAt(resultString.length - 2) == ',')
        resultString = resultString.substr(0, resultString.length - 2);

      return resultString;
    }
  }

  /**
   *
   *
   * @param type
   * @returns {any}
   */
  function actionConverter (type):string {
    var actions = {
      0: "overnight",
      1: "walk",
      2: "drive",
      4: "bus",
      6: "subway",
      8: "train",
      16: "flight",
      32: "cab",
      64: "ship"
    };

    if (actions[type] != null) {
      return 'action.' + actions[type];
    }
    return '';
  }
}
