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

    var languages = AppController.getAvailableLanguages();
    res.status(200).json(languages);
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

    var currencies = AppController.getAvailableCurrencies();
    res.status(200).json(currencies);
  });

  app.get('/countries', function (req, res) {

    AppController.getCountries()
      .then(function(countryList) {
        res.status(200).json(countryList);
      })
      .catch(function(err) {
        res.status(500).json(err.message);
      });
  });

  // =============================================================================
  // SUBSCRIPTION ================================================================
  // =============================================================================
  app.post('/subscribe-newsletter', function(req, res) {
    console.log('Subscribe for email: ', req.body.email);

    AppController
      .subscribe(req.body.email)
      .then(function() {
        res.status(200).send();
      })
      .catch(function(err) {
        res.status(500).send(err.message);
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
