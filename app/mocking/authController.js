// mocking/authController.js

var Promise = require('es6-promise').Promise;
var jwt = require('jwt-simple');

module.exports = {

  forgotPassword: function(req, res, next) {

    return new Promise(function (resolve, reject) {
      resolve();
    });
  },

  resetPassword: function(req, res, next) {

    return new Promise(function (resolve, reject) {
      resolve();
    });
  },

  validatePasswordResetToken: function(req, passwordResetToken) {

    return new Promise(function(resolve, reject) {
      resolve();
    });
  },

  isLoggedIn: function(req, res, next) {

    req.user = {
      id: 42,
      licence: 1
    };
    return next();
  },

  getUserIdFromRequest: function(req, secret) {

    return 42;
  },

  getExpirationDate: function(daysFromNow) {
    var someDate = new Date();

    if (typeof daysFromNow == "number" && isFinite(daysFromNow) && daysFromNow % 1 === 0) {
      someDate.setDate(someDate.getDate() + daysFromNow);
      return someDate.getTime();
    }
    else
      throw new Error('Wrong argument format.');
  },

  getAuthenticationToken: function(req, res, secret) {

    var expires = this.getExpirationDate(7);
    return jwt.encode({ iss: 1, exp: expires }, secret);
  }
};
