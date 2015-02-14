// mocking/appController.js

var Promise = require('es6-promise').Promise;

module.exports = {

  getAvailableCurrencies: function() {

    return new Promise(function(resolve) {
      resolve(createCurrenciesMock());
    });
  },

  getAvailableLanguages: function() {

    return new Promise(function(resolve) {
      resolve(createLanguagesMock());
    });
  },

  getTranslations: function(languageCode) {

    console.log("Creating translations mock for " + languageCode + ".");

    return new Promise(function(resolve, reject) {

      if(languageCode.length > 0)
        resolve(createTranslationMock());
      else
        reject(new Error('Could not retrieve language for given language code.'));
    });
  }
};

// ==========================================================================
// MOCKING OBJECT CREATORS ==================================================
// ==========================================================================

function createLanguagesMock() {
  return [
    {
      'code': 'de-DE',
      'name': 'Deutsch'
    },
    {
      'code': 'en-US',
      'name': 'English'
    }
  ]
}

function createCurrenciesMock() {
  return [
    {
      code: "EUR",
      symbol: "€",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      roundingCoefficient: 0,
      decimalDigits: 2
    },
    {
      code: "USD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      roundingCoefficient: 0,
      decimalDigits: 2
    }
  ]
}

function createTranslationMock() {
  return {
    'test': 'test',
    'bla': 'bla',
    'name': 'name'
  }
}