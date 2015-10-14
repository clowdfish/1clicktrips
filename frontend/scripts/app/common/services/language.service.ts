/// <reference path="../../../_all.ts" />

module Common {

  'use strict';

  /**
   * Switch and store app language
   */
  export class Language {

    private _data = {};
    private _activeLanguage;

    constructor(private $localStorage,
                private $translate,
                private $q) {

    }

    public initialize() {
      var languages = window['AppData']['languages'];

      languages.map((language) => {
        this._data[language.code] = language;
      });

      if (false === _.isEmpty(this.$localStorage['language'])) {
        this._activeLanguage = this.$localStorage['language'];
      } else {
        this._activeLanguage = _.find(languages, (language) => {
          return language['isDefault'] === true;
        });
      }

      this.changeLanguage(this._activeLanguage);
    }

    public getActiveLanguage() {
      return this._activeLanguage;
    }

    public getLanguageByCode(code) {
      if (this._data[code]) {
        return this._data[code];
      }
      return null;
    }

    public changeLanguage(code) {
      return this.$q((resolve, reject) => {
        var language = this.getLanguageByCode(code);
        if (language) {
          this.$localStorage['language'] = code;
          this._activeLanguage = language;
          this.$translate.use(code).then(function() {
            resolve();
          }, function(err) {
            reject(err);
          });
          return true;
        }
        return false;
      });

    }

    public static Factory() {
      var service = ($localStorage, $translate, $q) => {
         return new Language($localStorage, $translate, $q);
      }
      service['$inject'] = ['$localStorage', '$translate', '$q'];
      return service;
    }
  }
}