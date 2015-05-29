'use strict';

describe('untilTime: filter', function() {
  var untilTime;
  beforeEach(function() {
    module('app');
  });

  beforeEach(inject(function(_$filter_) {
    untilTime = _$filter_('untilTime');
  }));

  it('generate date correctly', function() {
    var startDateString, endDateString;

    startDateString = '2015-10-30T12:00:00';
    endDateString = '2015-10-30T15:00:00';
    expect(untilTime(startDateString, endDateString)).toEqual('30.10.2015, 12:00 - 15:00');

    startDateString = '2015-10-30T20:00:00';
    endDateString = '2015-10-30T21:00:00';
    expect(untilTime(startDateString, endDateString)).toEqual('30.10.2015, 20:00 - 21:00');

    startDateString = '2015-10-30T20:00:00';
    endDateString = '2015-10-31T20:00:00';
    expect(untilTime(startDateString, endDateString)).toEqual('30.10.2015, 20:00 - 31.10.2015, 20:00');

    startDateString = '2015-10-30T20:00:00';
    endDateString = '2015-11-01T20:00:00';
    expect(untilTime(startDateString, endDateString)).toEqual('30.10.2015, 20:00 - 01.11.2015, 20:00');

    startDateString = 'invalid1';
    endDateString = 'invalid2';
    expect(untilTime(startDateString, endDateString)).toEqual(null);
  });
});
