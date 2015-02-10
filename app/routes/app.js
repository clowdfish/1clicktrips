// routes/app.js

module.exports = function (app, production) {

  // =============================================================================
  // LANGUAGE ====================================================================
  // =============================================================================

  app.get('/i18n', function (req, res) {

    if(!production) {
      res.status(200).json(
        [
          {
            'code': 'de-DE',
            'name': 'Deutsch'
          },
          {
            'code': 'en-US',
            'name': 'English'
          }
        ]
      );
    }
    else {
      // TODO retrieve languages from database and deliver to client
    }
  });

  app.get('/i18n/:code', function (req, res) {

    var languageCode = req.param('code');
    console.log('Language code retrieved: ' + languageCode);

    if(!production) {
      // send language with the given language code
      res.status(200).json(
        {
          'test': 'test',
          'bla': 'bla',
          'name': 'name'
        }
      );
    }
    else {
      // TODO retrieve and parse language file and deliver to client
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