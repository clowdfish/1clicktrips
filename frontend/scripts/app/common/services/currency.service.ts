/// <reference path="../../../_all.ts" />

module Common {

  'use strict';

  export interface CurrencyItem {
    code: string;
    symbol: string;
    thousandsSeparator: string;
    decimalSeparator: string;
    symbolOnLeft: boolean;
    spaceBetweenAmountAndSymbol: boolean;
    roundingCoefficient: number;
    decimalDigits: number;
    isDefault?: boolean;
  }

  export class Currency {

    private _data = null;
    public selectedCurrency;
    private _isInitialize = false;

    constructor(private $localStorage) {

    }

    /**
     *
     */
    public initialize() {
      if (this._isInitialize) return;

      this._data = {};
      var currencies = window['AppData']['currencies'];

      currencies.map((currencyItem: CurrencyItem) => {
        this._data[currencyItem.code.toLowerCase()] = currencyItem;
      });

      if (false === _.isEmpty(this.$localStorage['selectedCurrency'])) {
        this.selectedCurrency = this.getCurrencyByCode(this.$localStorage['selectedCurrency']);
      } else {
        this.selectedCurrency = _.find(currencies, (currencyItem: CurrencyItem) => {
          return currencyItem.isDefault == true;
        });
      }
      this._isInitialize = true;
    }

    /**
     *
     *
     * @param code
     * @returns {any}
     */
    public getCurrencyByCode(code: string): CurrencyItem {
      if(!this._data)
        this.initialize();

      if (this._data[code]) {
        return this._data[code];
      }
      return null;
    }

    /**
     *
     *
     * @returns {null}
     */
    public getAvailableCurrencies() {
      if(!this._data)
        this.initialize();

      return this._data;
    }

    /**
     *
     *
     * @returns {any}
     */
    public getSelectedCurrency(): CurrencyItem {
      if(!this._data)
        this.initialize();

      return this.selectedCurrency;
    }

    /**
     *
     *
     * @param code
     * @returns {boolean}
     */
    public setSelectedCurrency(code) {
      var currency = this.getCurrencyByCode(code);

      if (currency) {
        this.selectedCurrency = currency;
        this.$localStorage['selectedCurrency'] = code;
        return true;
      } else {
        return false;
      }

    }

    /**
     *
     *
     * @returns {function(any): Common.Currency}
     * @constructor
     */
    public static Factory(): any {
      var service = ($localStorage) => {
        return new Currency($localStorage);
      };

      service['$inject'] = ['$localStorage'];
      return service;
    }

  }
}