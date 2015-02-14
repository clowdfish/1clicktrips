// routes/app.js

module.exports = function (app, production) {

  // ==========================================================================
  // CONTROLLER SETUP =========================================================
  // ==========================================================================

  var AppController = null;

  if(production) {
    AppController = require('../controller/appController');
  }
  else {
    AppController = require('../mocking/appController');
  }

  // =============================================================================
  // LANGUAGE ====================================================================
  // =============================================================================

  app.get('/locales', function (req, res) {

    AppController.getAvailableLanguages()
      .then(function(languages) {
        res.status(200).json(languages);
      })
      .catch(function(err) {
        res.status(500).json(err.message);
      });
  });

  app.get('/locales/:code', function (req, res) {

    var languageCode = req.param('code');
    console.log('Language code retrieved: ' + languageCode);

    AppController.getTranslations(languageCode)
      .then(function(translations) {
        res.status(200).json(translations);
      })
      .catch(function(err) {
        res.status(500).json(err.message);
      });
  });

  // =============================================================================
  // CURRENCY ====================================================================
  // =============================================================================
  app.get('/currencies', function (req, res) {

    AppController.getAvailableCurrencies()
      .then(function(currencies) {
        res.status(200).json(currencies);
      })
      .catch(function(err) {
        res.status(500).json(err.message);
      });
  });

  // =============================================================================
  // FALLBACK ====================================================================
  // =============================================================================

  // all other requests should be answered with 404
  app.use('*', function (req, res) {
    res.status(404).send('status.user.error.server.failure');
  });
};