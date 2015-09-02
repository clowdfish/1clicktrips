'use strict';

describe('tripSegment directive', function() {

  var $compile, $rootScope;

  beforeEach(module('app.result'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('does something cool', function() {

    var element = $compile('<trip-segment></trip-segment>')($rootScope);

    expect(element.hasClass('result-details-segment')).toBe(true);
  });
});