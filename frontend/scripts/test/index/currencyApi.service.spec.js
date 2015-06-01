'use strict';

describe('currencyApi: service', function() {
  var currencyApi;

  beforeEach(function() {
    module('app');
  });

  beforeEach(inject(function(_currencyApi_) {
    currencyApi = _currencyApi_;
  }));

  it('get/set active currency code', function() {
    currencyApi.setActiveCurrency('usd');
    expect(currencyApi.getActiveCurrency()).toEqual('usd');

    currencyApi.setActiveCurrency('eur');
    expect(currencyApi.getActiveCurrency()).toEqual('eur');

    currencyApi.setActiveCurrency('aud');
    expect(currencyApi.getActiveCurrency()).toEqual('eur');
  });
})
