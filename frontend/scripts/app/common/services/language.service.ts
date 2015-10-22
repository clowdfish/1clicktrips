/// <reference path="../../../_all.ts" />

module Common {

  'use strict';

  export interface LanguageItem {
    code: string;
    name: string;
    locale: string;
    defaultCurrency: string;
    startingDay: number; // Starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday).
    isDefault?: boolean;
  }

  /**
   * Switch and store app language
   */
  export class Language {

    private _data = null;
    public _activeLanguage;
    private _isInitialize = false;

    constructor(private $localStorage,
                private $translate,
                private $q) {

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
            
      if (false === _.isEmpty(this.$localStorage['language'])) {
        this._activeLanguage = this.getLanguageByCode(this.$localStorage['language']);
      } else {
        this._activeLanguage = _.find(languages, (language: LanguageItem) => {
          return language.isDefault === true;
        });
      }

      this.changeLanguage(this._activeLanguage.code);
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
          this.$localStorage['language'] = code;
          this._activeLanguage = language;
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
      var service = ($localStorage, $translate, $q) => {
         return new Language($localStorage, $translate, $q);
      };

      service['$inject'] = ['$localStorage', '$translate', '$q'];
      return service;
    }
  }
}