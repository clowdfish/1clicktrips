var jwt     = require('jwt-simple');
var Promise = require('es6-promise').Promise;

module.exports = function (app, express, production) {
  var BookingController,
      AuthController;

  if (production) {
    BookingController = require('../controller/bookingController');
    AuthController = require('../controller/authController');
  } else {
    BookingController = require('../mocking/bookingController');
    AuthController = require('../mocking/authController');
  }

  var secret = app.get('jwtTokenSecret');

  // ==========================================================================
  // RETRIEVE BOOKING(S) ======================================================
  // ==========================================================================

  app.get('/bookings/', AuthController.isLoggedIn, function(req, res) {
    var userId = AuthController.getUserIdFromRequest(req, secret);
    if (userId === -1) {
      res.status(401);
      return;
    }

    console.log('Get bookings for user: ', userId);

    BookingController.getBookings(userId)
      .then(function(bookings) {
        res.status(200).json(bookings);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  app.get('/booking/:id', AuthController.isLoggedIn, function(req, res) {
    var userId = AuthController.getUserIdFromRequest(req, secret);
    var bookingId = req.param('id');

    console.log('Get booking with id: ', bookingId);

    BookingController.getById(bookingId, userId)
      .then(function(bookingItem) {
        res.status(200).json(bookingItem);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  // ==========================================================================
  // CREATE BOOKING ===========================================================
  // ==========================================================================

  app.post('/booking/request/', function(req, res) {
    if (!req.body) {
      res.status(500);
      return;
    }

    var userId = AuthController.getUserIdFromRequest(req, secret);
    if (false === validateBookingRequest(userId, req.body)) {
      res.status(500).send('status.user.error.request.malformed');
      return;
    }

    BookingController.requestRealBooking(userId, req.body, req)
      .then(function() {
        res.status(200).send();
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  app.post('/booking/', AuthController.isLoggedIn, function(req, res) {
    if (!req.body) {
      res.status(500);
      return;
    }

    var userId = AuthController.getUserIdFromRequest(req, secret);

    if (false === validateStoreBookingRequest(req.body)) {
      res.status(500).send('status.user.error.request.malformed');
      return;
    }

    BookingController.storeBooking(userId, req)
      .then(function() {
        res.status(200).send();
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  app.delete('/booking/:bookingId', AuthController.isLoggedIn, function(req, res) {
    var userId = AuthController.getUserIdFromRequest(req, secret);
    BookingController
      .deleteById(userId, req.params.bookingId)
      .then(function() {
        res.sendStatus(200);
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).send(err.message);
      });
  });
};

/**
* Validate set booking request
*/
function validateBookingRequest(userId, requestBody) {
  if (!_.has(requestBody, 'trip') || _.isEmpty(requestBody.trip)) {
    console.log('Missing trip data');
    return false;
  }

  if (!_.has(requestBody, 'user') || _.isEmpty(requestBody.user)) {
    console.log('Missing user data');
    return false;
  }
  return true;
}

function validateStoreBookingRequest(requestBody) {

  if (!_.has(requestBody, 'trip') || _.isEmpty(requestBody.trip)) {
    console.log('Missing trip data');
    return false;
  }
  return true;
}
