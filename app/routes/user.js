// routes/user.js

var jwt     = require('jwt-simple');
var Promise = require('es6-promise').Promise;

var AuthController = require('../controller/auth');
var SettingsController = require('./../controller/settings');
var UserController = require('./../controller/user');


module.exports = function (app, express) {

  var secret = app.get('jwtTokenSecret');

  // get an instance of router
  var accountApi = express.Router();

  // account root
  accountApi.get('/', function (req, res) {

    res.status(403).send('not accessible');
  });

  app.use('/account', accountApi);

  // ==========================================================================
  // PROFILE  =================================================================
  // ==========================================================================

  accountApi.get('/profile', function (req, res) {

    var user = AuthController.getUserFromRequest(req, secret);

    /*
    SettingsController.getSettings(userId, function (callback_settings) {
      if (callback_settings)
        res.status(200).json(callback_settings.profile);
      else
        res.status(500);
    });*/

  });

  accountApi.post('/profile', function (req, res) {

    /*
    if (req.body) {
      var userId = getUserIdFromToken(req);

      SettingsController.createSettings(userId, {'profile': req.body}, function (err, success) {
        if (err) {
          console.error('There was a problem updating the settings.');
          res.status(500).send();
        }

        res.status(200).send(success);
      });
    }
    else {
      res.status(400).send();
    }*/

  });

  // ==========================================================================
  // SETTINGS  ================================================================
  // ==========================================================================

  accountApi.get('/settings', function (req, res) {

    var user = AuthController.getUserFromRequest(req, secret);

    /*
    SettingsController.getSettings(userId, function (callback_settings) {
      if (callback_settings)
        res.status(200).json(callback_settings.preferences);
      else
        res.status(500);
    });*/
  });

  accountApi.post('/settings', function (req, res) {

    /*
    if (req.body) {
      var userId = getUserIdFromToken(req);

      SettingsController.createSettings(userId, {'preferences': req.body}, function (err, success) {
        if (err) {
          console.error('There was a problem updating the settings.');
          res.status(500).send();
        }

        res.status(200).send(success);
      });
    }
    else {
      res.status(400).send();
    }*/

  });

  // ==========================================================================
  // FAVORITES ================================================================
  // ==========================================================================

  accountApi.get('/favorites', function (req, res) {

    var user = AuthController.getUserFromRequest(req, secret);

    /*
    SettingsController.getSettings(userId, function (callback_settings) {
      if (callback_settings)
        res.status(200).json(callback_settings.privacy);
      else
        res.status(500);
    });*/

  });

  accountApi.post('/favorites', function (req, res) {

    /*
    if (req.body) {
      var userId = getUserIdFromToken(req);

      SettingsController.createSettings(userId, {'privacy': req.body}, function (err, success) {
        if (err) {
          console.error('There was a problem updating the settings.');
          res.status(500).send();
        }

        res.status(200).send(success);
      });
    }
    else {
      res.send(400).send();
    }*/

  });

  // ==========================================================================
  // BOOKINGS =================================================================
  // ==========================================================================

  accountApi.get('/bookings', function (req, res) {

    var user = AuthController.getUserFromRequest(req, secret);

    /*
    SettingsController.getSettings(userId, function (callback_settings) {
      if (callback_settings)
        res.status(200).json(callback_settings.privacy);
      else
        res.status(500);
    });*/

  });

  accountApi.post('/bookings', function (req, res) {

    /*
    if (req.body) {
      var userId = getUserIdFromToken(req);

      SettingsController.createSettings(userId, {'privacy': req.body}, function (err, success) {
        if (err) {
          console.error('There was a problem updating the settings.');
          res.status(500).send();
        }

        res.status(200).send(success);
      });
    }
    else {
      res.send(400).send();
    }*/

  });

  // Check for access token on particular API calls
  app.all('/account/*', AuthController.isLoggedIn);
};