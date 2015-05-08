// routes/user.js

var jwt     = require('jwt-simple');
var Promise = require('es6-promise').Promise;
var multipart     = require('connect-multiparty');
var generalConfig = require('../../config/general.js');

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
    BookingController = require('../mocking/bookingController');
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

  /**
  * Middleware to get upload content
  */
  var multipartMiddleware = multipart({
    uploadDir: generalConfig.temporaryFolderDir
  });

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
        if (profile) {
          //console.log(JSON.stringify(profile, null, 2));
          res.status(200).json(profile);
        }
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
      UserController.setProfile(userId, req.body)
        .then(function() {
          res.status(200).send();
        })
        .catch(function(err) {
          console.error('There was a problem updating the profile.', err);
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
          console.error('There was a problem updating the settings.', err);
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
          res.status(500).send("Could not retrieve favorites.");
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  accountApi.post('/favorites', function (req, res) {

    if (req.body && req.body.origin && req.body.origin.description && req.body.origin.location &&
        req.body.destination && req.body.destination.description && req.body.destination.location) {

      var userId = AuthController.getUserIdFromRequest(req, secret);

      UserController.setFavorite(userId, req.body)
        .then(function () {
          res.sendStatus(200);
        })
        .catch(function(err) {
          console.error('There was a problem updating the favorites.');
          res.status(500).send(err.message);
        });
    }
    else {
      res.sendStatus(400);
    }
  });

  accountApi.delete('/favorites/:id', function(req, res) {

    var userId = AuthController.getUserIdFromRequest(req, secret);

    var favoriteId = req.param('id');
    console.log('Favorite id retrieved: ' + favoriteId);

    UserController.deleteFavorite(userId, favoriteId)
      .then(function() {
        res.sendStatus(200);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  accountApi.post('/favorites/updateposition', function(req, res) {
    var userId = AuthController.getUserIdFromRequest(req, secret);
    UserController.updateFavoritePosition(userId, req.body)
      .then(function() {
        res.sendStatus(200);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      })
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
          res.sendStatus(500);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  accountApi.get('/bookings/:id', function(req, res) {
    var userId = AuthController.getUserIdFromRequest(req, secret);
    var bookingId = req.param('id');

    console.log('Booking id retrieved: ', bookingId);
    BookingController.getById(bookingId)
      .then(function(bookingItem) {
        res.status(200).json(bookingItem);
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
          res.sendStatus(200);
        })
        .catch(function(err) {
          console.error('There was a problem updating the favorites.');
          res.status(500).send(err.message);
        });
    }
    else {
      res.sendStatus(400);
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
          res.sendStatus(500);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  // ==========================================================================
  // UPLOAD IMAGE =============================================================
  // ==========================================================================

  accountApi.post('/upload', multipartMiddleware, function(req, res) {
    var userId = AuthController.getUserIdFromRequest(req, secret);

    UserController.uploadProfilePicture(req, userId)
      .then(function(imagePath) {
        console.log(imagePath);
        res.status(200).send(imagePath);
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).send(err.message);
      });
  });
};

