/// <reference path="../../_all.ts" />

module Common {

  'use strict';

  export interface LanguageItem {
    code: string;
    name: string;
    locale: string;
    defaultCurrency: string;
    dateFormat: string;
    startingDay: number; // Starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday).
    isDefault?: boolean;
  }

  /**
   * Manage and set active language
   */
  export class Language {

    private _data = null;
    public _activeLanguage;
    private _isInitialize = false;

    constructor(private $localStorage,
                private $translate,
                private $q,
                private currency: Common.Currency) {

    }

    /**
     *
     */
    public initialize(): void {
      if (this._isInitialize) return;
      var languages = window['AppData']['languages'];

      this._data = {};
      languages.forEach((language: LanguageItem) => {
        this._data[language.code] = language;
      });

      if (window['locale']) {
        this._activeLanguage = this.getLanguageByCode(window['locale']);
        // this part is dangerous because we should not be able to change
        // the currency in a result screen
        //this.currency.setSelectedCurrency(this._activeLanguage.defaultCurrency);
        this.changeLanguage(this._activeLanguage.code);
      }

      this._isInitialize = true;
    }

    /**
     *
     *
     * @returns {any}
     */
    public getActiveLanguage(): LanguageItem {
      if(!this._data)
        this.initialize();

      return this._activeLanguage;
    }

    /**
     *
     *
     * @param code
     * @returns {any}
     */
    public getLanguageByCode(code): LanguageItem {
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
     * @param code
     * @returns {any}
     */
    public changeLanguage(code) {
      return this.$q((resolve, reject) => {
        var language = this.getLanguageByCode(code);

        if (language) {
          this._activeLanguage = language;
          this.$localStorage['selected_language'] = code;
          this.$translate.use(code).then(function() {
            return resolve();
          }, function(err) {
            return reject(err);
          });
          return resolve();
        }
        return reject();
      });
    }

    /**
     *
     *
     * @returns {null}
     */
    public getAvailableLanguages() {
      if(!this._data)
        this.initialize();

      return this._data;
    }

    public static Factory(): any {
      var service = ($localStorage, $translate, $q, currency: Common.Currency) => {
         return new Language($localStorage, $translate, $q, currency);
      };

      service['$inject'] = ['$localStorage', '$translate', '$q', 'currency'];
      return service;
    }
  }
}