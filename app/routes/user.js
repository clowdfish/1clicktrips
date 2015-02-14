// routes/user.js

var jwt     = require('jwt-simple');
var Promise = require('es6-promise').Promise;

module.exports = function (app, express, production) {

  // ==========================================================================
  // CONTROLLER SETUP =========================================================
  // ==========================================================================

  var AuthController = null;
  var SettingsController = null;
  var UserController = null;
  var BookingController = null;

  if(production) {
    SettingsController = require('../controller/settingsController');
    UserController = require('../controller/userController');
    AuthController = require('../controller/authController');
    BookingController = require('../controller/bookingController');
  }
  else {
    SettingsController = require('../mocking/settingsController');
    UserController = require('../mocking/userController');
    AuthController = require('../mocking/authController');
    BookingController = require('../mocking/bookingController');
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

      SettingsController.set(userId, req.body)
        .then(function () {
          res.status(200).send();
        })
        .catch(function(err) {
          console.error('There was a problem updating the settings.');
          res.status(500).send(err.message);
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

    UserController.getFavorites(userId)
      .then(function (favorites) {
        if (favorites)
          res.status(200).json(favorites);
        else
          res.status(500);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  accountApi.post('/favorites', function (req, res) {

    if (req.body) {
      var userId = AuthController.getUserIdFromRequest(req, secret);

      UserController.setProfile(userId, req.body)
        .then(function () {
          res.status(200).send();
        })
        .catch(function(err) {
          console.error('There was a problem updating the favorites.');
          res.status(500).send(err.message);
        });
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
    var limit = req.query.limit;
    // other query params: offset

    BookingController.getBookings(userId, limit ? limit : 3)
      .then(function (bookings) {
        if (bookings)
          res.status(200).json(bookings);
        else
          res.status(500);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  accountApi.post('/bookings', function (req, res) {

    if (req.body) {
      var userId = AuthController.getUserIdFromRequest(req, secret);

      BookingController.setBooking(userId, req.body)
        .then(function () {
          res.status(200).send();
        })
        .catch(function(err) {
          console.error('There was a problem updating the favorites.');
          res.status(500).send(err.message);
        });
    }
    else {
      res.send(400).send();
    }
  });

  // ==========================================================================
  // MESSAGES =================================================================
  // ==========================================================================

  accountApi.get('/messages', function (req, res) {

    var userId = AuthController.getUserIdFromRequest(req, secret);

    UserController.getMessages(userId)
      .then(function (messages) {
        if (messages)
          res.status(200).json(messages);
        else
          res.status(500);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });
};