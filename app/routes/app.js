// routes/app.js

module.exports = function (app, production) {

  // =============================================================================
  // LANGUAGE ====================================================================
  // =============================================================================

  app.get('/locales', function (req, res) {

    if(!production) {
      res.status(200).json(createLanguagesMock());
    }
    else {
      // TODO retrieve languages from database and deliver to client
    }
  });

  app.get('/locales/:code', function (req, res) {

    var languageCode = req.param('code');
    console.log('Language code retrieved: ' + languageCode);

    if(!production) {
      // send language with the given language code
      res.status(200).json(createTranslationMock());
    }
    else {
      // TODO retrieve and parse language file and deliver to client
    }
  });

  // =============================================================================
  // CURRENCY ====================================================================
  // =============================================================================
  app.get('/currencies', function (req, res) {

    if(!production) {
      res.status(200).json(createCurrencyMock());
    }
    else {
      // TODO retrieve currencies from database and deliver to client
    }
  });

  // =============================================================================
  // FALLBACK ====================================================================
  // =============================================================================

  // all other requests should be answered with 404
  app.use('*', function (req, res) {
    res.status(404).send('status.user.error.server.failure');
  });
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

function createCurrencyMock() {
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