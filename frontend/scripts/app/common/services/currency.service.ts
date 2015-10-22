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

    private _data;
    public selectedCurrency;
    private _isInitialize = false;
    constructor(private $localStorage) {

    }

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

    public getCurrencyByCode(code: string): CurrencyItem {
      if (this._data[code]) {
        return this._data[code];
      }
      return null;
    }

    public getAvailableCurrencies() {
      return this._data;
    }

    public getSelectedCurrency(): CurrencyItem {
      return this.selectedCurrency;
    }

    public setSelectedCurrency(code) {
      console.log(this._data);
      var currency = this.getCurrencyByCode(code);
      console.log(currency);
      if (currency) {
        this.selectedCurrency = currency;
        this.$localStorage['selectedCurrency'] = code;
        return true;
      } else {
        return false;
      }

    }

    public static Factory(): any {
      var service = ($localStorage) => {
        return new Currency($localStorage);
      }
      service['$inject'] = ['$localStorage'];
      return service;
    }

  }
}