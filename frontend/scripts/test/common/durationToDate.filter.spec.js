'use strict';

describe('durationToDate filter', function() {
  var $filter, durationToDate;

  beforeEach(function() {
    module('app.common');
    inject(function(_$filter_) {
      $filter = _$filter_;
      durationToDate = $filter('durationToDate');
    });
  });

  it('returns emty string when given null', function() {
    expect(durationToDate(null), '');
  });

  it('throw error when given invalid format', function() {
    expect(function() {
      durationToDate(12 * 60, '%Y %N')
    }).toThrow(new Error('Invalid format, it should have %d and %n'));
  });

  it('returns expected days and night when given a number', function() {
    expect(durationToDate(12 * 60)).toEqual("1 days 0 night");
    expect(durationToDate(24 * 60)).toEqual("1 days 1 night");
    expect(durationToDate(24 * 60, "%d days %n night")).toEqual("1 days 1 night");
    expect(durationToDate(36 * 60, "%dd %nn")).toEqual("2d 1n");
  });
});
