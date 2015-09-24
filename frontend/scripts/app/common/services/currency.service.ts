/// <reference path="../../../_all.ts" />
module Common {

  'use strict';

  export class Currency {
    public get() {
      return {
        "code": "EUR",
        "symbol": "€",
        "thousandsSeparator": ".",
        "decimalSeparator": ",",
        "symbolOnLeft": false,
        "spaceBetweenAmountAndSymbol": true,
        "roundingCoefficient": 0,
        "decimalDigits": 2
      }
    }
  }
};