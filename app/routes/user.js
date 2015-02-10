// routes/user.js

var jwt     = require('jwt-simple');
var Promise = require('es6-promise').Promise;

module.exports = function (app, express, production) {

  // ==========================================================================
  // CONTROLLER SETUP =========================================================
  // ==========================================================================

  var AuthController = require('../controller/auth');
  var SettingsController = null;
  var UserController = null;

  if(production) {
    SettingsController = require('./../controller/settings');
    UserController = require('./../controller/user');

    AuthController.setProduction();
  }
  else {
    SettingsController = require('./../mocking/settings');
    UserController = require('./../mocking/user');
  }

  var secret = app.get('jwtTokenSecret');

  // ==========================================================================
  // ROUTER SETUP =============================================================
  // ==========================================================================

  // get an instance of router
  var accountApi = express.Router();

  // account root
  accountApi.get('/', function (req, res) {

    res.status(403).send('not accessible');
  });

  app.use('/account', accountApi);

  // Check for access token on particular API calls
  accountApi.all('/*', AuthController.isLoggedIn);

  // ==========================================================================
  // PROFILE  =================================================================
  // ==========================================================================

  accountApi.get('/profile', function (req, res) {

    var userId = AuthController.getUserIdFromRequest(req, secret);

    UserController.getProfile(userId)
      .then(function (profile) {
        if (profile)
          res.status(200).json(profile);
        else
          res.status(500);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });

  });

  accountApi.post('/profile', function (req, res) {

    if (req.body) {
      var userId = AuthController.getUserIdFromRequest(req, secret);

      UserController.setProfile(userId, req.body['Profile'])
        .then(function() {
          res.status(200).send();
        })
        .catch(function(err) {
          console.error('There was a problem updating the profile.');
          res.status(500).send();
        });
    }
  });

  // ==========================================================================
  // SETTINGS  ================================================================
  // ==========================================================================

  accountApi.get('/settings', function (req, res) {

    var userId = AuthController.getUserIdFromRequest(req, secret);

    SettingsController.get(userId)
      .then(function (settings) {
        if (settings)
          res.status(200).json(settings);
        else
          res.status(500);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  accountApi.post('/settings', function (req, res) {

    if (req.body) {
      var userId = AuthController.getUserIdFromRequest(req, secret);

      SettingsController.set(userId, {'preferences': req.body}, function (err, success) {
        if (err) {
          console.error('There was a problem updating the settings.');
          res.status(500).send();
        }

        res.status(200).send(success);
      });
    }
    else {
      res.status(400).send();
    }
  });

  // ==========================================================================
  // FAVORITES ================================================================
  // ==========================================================================

  accountApi.get('/favorites', function (req, res) {

    var userId = AuthController.getUserIdFromRequest(req, secret);

    // TODO implement
    res.status(200).send({});
  });

  accountApi.post('/favorites', function (req, res) {

    if (req.body) {
      var userId = AuthController.getUserIdFromRequest(req, secret);

      // TODO implement
      res.status(200).send();
    }
    else {
      res.send(400).send();
    }
  });

  // ==========================================================================
  // BOOKINGS =================================================================
  // ==========================================================================

  accountApi.get('/bookings', function (req, res) {

    var userId = AuthController.getUserIdFromRequest(req, secret);

    // TODO implement
    res.status(200).send({});
  });

  accountApi.post('/bookings', function (req, res) {


    if (req.body) {
     var userId = AuthController.getUserIdFromRequest(req, secret);

      // TODO implement
      res.status(200).send();
    }
    else {
      res.send(400).send();
    }

  });
};