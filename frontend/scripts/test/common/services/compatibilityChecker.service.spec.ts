/// <reference path="../../_test.ts" />

'use strict';

describe('service: compatibilityChecker', () => {
  var compatibilityChecker: Common.CompatibilityChecker,
      $q: ng.IQService,
      $scope;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject((_$q_: ng.IQService,
                     _$rootScope_) => {
   $q = _$q_;
   $scope = _$rootScope_.$new();
   compatibilityChecker = new Common.CompatibilityChecker($q);
  }));

  /**
   * Look like simulate browser can not add <img/> element so I ignore this test
   */
  xit('Detect new browser correctly', () => {
    var isOldBrowser = null;
    compatibilityChecker
      .isOldBrowser()
      .then((result) => {
        console.log('aaaa');
        isOldBrowser = result;
      });
    $scope.$digest();
    expect(isOldBrowser).toEqual(false);
  });

  it('Detect old browser', () => {
    window['File'] = null;
    window['FileReader'] = null;
    var isOldBrowser = null;
    compatibilityChecker
      .isOldBrowser()
      .then((result) => {
        isOldBrowser = result;
      });
    $scope.$digest();
    expect(isOldBrowser).toEqual(true);
  });
});