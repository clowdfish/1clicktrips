/// <reference path="../../../_all.ts" />

module Common {

  'use strict';

  /**
   * Convert an itinerary into an action verb.
   */
  export function vehicleTypeToAction($translate) {
    return function(type:number) {
      return $translate.instant(actionConverter(type));
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
