/// <reference path="../../_all.ts" />

module Common {

  'use strict';

  /**
   * Language dropdown
   */
  export function languageDropdown(language: Common.Language) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/templates/directives/language-dropdown.html',
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
        //Just redirect
        var hrefArray = location.href.split('#');
        var newHref = '/' + languageItem.code + '/#' + hrefArray[1];

        if (location.href !== location.origin + newHref) {
          location.href = newHref;
        }
      }
    }
  }
}