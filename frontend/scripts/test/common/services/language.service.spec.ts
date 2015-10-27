/// <reference path="../../_test.ts" />

'use strict';

describe('service: language', () => {
  var language: Common.Language,
      $q,
      $localStorage,
      $translate,
      $scope,
      languages: Array<Common.LanguageItem>,
      currency: Common.Currency,
      locale;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject((_$translate_,
                     _$localStorage_,
                     _$q_,
                     _$rootScope_) => {
    $q = _$q_;
    $translate = _$translate_;
    $localStorage = _$localStorage_;

    if ($localStorage['language']) {
      $localStorage['language'] = null;
    }
    window['locale'] = 'en';
    $scope = _$rootScope_.$new();
    currency = new Common.Currency($localStorage);
    language = new Common.Language($localStorage, $translate, $q, currency);
    languages = window['AppData']['languages'];
    language.initialize();
  }));

  afterEach(() => {
    if ($localStorage['language']) {
      $localStorage['language'] = null;
    }
  });

  it('English is default language', () => {
    var defaultLanguage = _.find(languages, (item: Common.LanguageItem) => {
      return item.isDefault === true;
    });
    expect(language.getActiveLanguage()).toEqual(defaultLanguage);
  });

  it('Get and set language correctly', () => {
    language.changeLanguage('de').then(() => {

    });
    $scope.$digest();
    expect(language.getActiveLanguage()['code']).toEqual('de');
  });
});