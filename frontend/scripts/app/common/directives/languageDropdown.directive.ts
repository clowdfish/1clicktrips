/// <reference path="../../../_all.ts" />

module Common {

  'use strict';

  /**
   * Language dropdown
   */
  export function languageDropdown(language: Common.Language,
                                   currency: Common.Currency) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'scripts/app/templates/directives/language-dropdown.html',
      link: link,
      scope: {}
    };

    function link(scope, element, attrs) {

      scope.showLanguageList = false;

      scope.languages = language.getAvailableLanguages();
      scope.selectedLanguage = language.getActiveLanguage();
      scope.selectLanguage = selectLanguage;

      /**
       * Set selected language.
       *
       * @param languageItem
       */
      function selectLanguage(languageItem: Common.LanguageItem) {
        scope.selectedLanguage = languageItem;

        language.changeLanguage(languageItem.code);
        currency.setSelectedCurrency(languageItem.defaultCurrency);
      }
    }
  }
}