'use strict';

describe('durationToTime directive', function() {
  var $filter, durationToTime;

  beforeEach(function() {
    module('app.common');
    inject(function(_$filter_) {
      $filter = _$filter_;
      durationToTime = $filter('durationToTime');
    });
  });

  it('should return empty string when give null parameter', function() {
    expect(durationToTime(null)).toEqual('');
  });

  it('throw error when given invalid format', function() {
    expect(function() {
      durationToTime(60, '%Y %N')
    }).toThrow(new Error('Invalid format, it should have %h and %m'));
  });

  it('should return expected value when give a minutes number', function() {
    expect(durationToTime(60)).toEqual('1 hrs 00 mins');
    expect(durationToTime(90)).toEqual('1 hrs 30 mins');
    expect(durationToTime(45)).toEqual('0 hrs 45 mins');
    expect(durationToTime(1440)).toEqual('24 hrs 00 mins');
  });
});
