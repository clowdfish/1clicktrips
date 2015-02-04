// routes/app.js

module.exports = function (app) {

  // =============================================================================
  // LANGUAGE ====================================================================
  // =============================================================================

  app.get('/i18n', function (req, res) {

    res.status(200).json(
      [
        {
          'iso': 'de-DE',
          'name': 'Deutsch'
        },
        {
          'iso': 'en-US',
          'name': 'English'
        }
      ]
    );
  });

  app.get('/i18n/:code', function (req, res) {

    var languageCode = req.params.id;
    console.log('Language code retrieved: ' + languageCode);

    // send language with the given language code
    res.status(200).json(
      {
        'test': 'test',
        'bla': 'bla',
        'name': 'name'
      }
    );
  });

  // =============================================================================
  // FALLBACK ====================================================================
  // =============================================================================

  // all other requests should be answered with 404
  app.use('*', function (req, res) {
    res.status(404).send('status.user.error.server.failure');
  });
};