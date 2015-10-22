/// <reference path="../../_all.ts" />

module Index {

  'use strict';

  /**
   * Language dropdown
   */
  export function languageDropdown(language: Common.Language) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/index/language-dropdown.html',
      link: link,
      scope: {}
    };

    function link(scope, element, attrs) {
      /**
       * Language list
       */
      scope.languages = language.getAvailableLanguages();

      /**
       * Selected language
       */
      scope.selectedLanguage = language.getActiveLanguage();

      /**
       * Method to select language
       */
      scope.selectLanguage = selectLanguage;

      /**
       * Language list visibility
       */
      scope.isShowLanguageList = false;

      /**
       * Set selected language
       */
      function selectLanguage(languageItem: Common.LanguageItem) {
        language.changeLanguage(languageItem.code);
        scope.selectedLanguage = languageItem;
      }
    }
  }
}