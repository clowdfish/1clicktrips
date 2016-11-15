// passport.js

var mysql = require('mysql');
var Promise = require('es6-promise').Promise;

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

// load the auth variables
var configAuth = require('./auth');
var bcrypt = require('bcrypt');
var dbConfig = require('./database');

var connection = mysql.createConnection(dbConfig.connection);

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM user WHERE id = ? ;", [id], function(err, rows){
      done(err, rows[0]);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-signup',

    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        connection.query("SELECT * FROM user WHERE email = ? ;", [email], function(err, rows) {
          if (err)
            return done(err);

          if (rows.length) {
            return done(null, false, {message: 'status.user.error.signup.exists'});
          } else {
            //temp salt
            var salt = bcrypt.genSaltSync(10);
            // if there is no user with that username
            // create the user
            var newUser = {
              email: email,
              password: bcrypt.hashSync(password, salt)  // use the generateHash function in our user model
            };

            var insertQuery = "INSERT INTO user ( email, password ) VALUES (?,?); ";

            connection.query(insertQuery, [newUser.email, newUser.password],function(err, rows) {
              newUser.id = rows.insertId;

              createUserData(rows.insertId)
                .then(function() {
                  // attach user to request
                  req.user = newUser; // required to work with req.user in subsequent middle wares
                  return done(null, newUser);
                })
                .catch(function(err) {
                  return done(err);
                });
            });
          }
        });
      })
  );

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-login',
    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) { // callback with email and password from our form
        connection.query("SELECT * FROM user WHERE email = ? ;", [email], function(err, rows){
          if (err)
            return done(err);

          // if no user is found, return the message
          if (!rows.length) {
            return done(null, false, {message: 'status.user.error.signin.username'});
          }

          // if the user is found but the password is wrong
          if (!bcrypt.compareSync(password, rows[0].password))
            return done(null, false, {message: 'status.user.error.signin.password'});

          // all is well, return successful user
          return done(null, rows[0]);
        });
      })
  );

  // =========================================================================
  // TWITTER =================================================================
  // =========================================================================
  passport.use(new TwitterStrategy({
      consumerKey       : configAuth.twitterAuth.consumerKey,
      consumerSecret    : configAuth.twitterAuth.consumerSecret,
      callbackURL       : configAuth.twitterAuth.callbackURL,
      passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function (req, token, tokenSecret, profile, done) {
      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Twitter
      process.nextTick(function () {
        // check if the user is already logged in
        if (!req.user) {
          connection.query("SELECT * FROM user WHERE twitter_id = ? ;", [profile.id], function (err, rows) {
            if (err)
              return done(err);

            // if the user is found then log him in
            if (rows.length) {
              var user = rows[0];

              // if there is a user id already but no token (user was linked at one point and then removed)
              // just add our token and profile information
              if (!user.twitter_token) {

                user.twitter_token = token;
                user.twitter_username = profile.username;
                user.twitter_display = profile.displayName;

                var updateQuery =
                  "UPDATE user " +
                  "SET twitter_token=?, twitter_username=?, twitter_display=? " +
                  "WHERE id=" + user.id + ";";

                connection.query(updateQuery, [token, profile.username, profile.displayName], function(err, rows) {
                  if (err)
                    throw err;

                  if(rows.affectedRows = 0) console.error("Could not update user.");

                  // attach user to request
                  req.user = user; // required to work with req.user in subsequent middle wares
                  return done(null, user);
                });
              }

              // attach user to request
              req.user = user; // required to work with req.user in subsequent middle wares
              return done(null, user);
            }
            else {
              // if there is no user, create one
              var newUser = {
                twitter_id: profile.id,
                twitter_token: token,
                twitter_username: profile.username,
                twitter_display: profile.displayName
              };

              var createQuery =
                "INSERT INTO user " +
                "(twitter_id, twitter_token, twitter_username, twitter_display) " +
                "VALUES (?, ?, ?, ?);";

              connection.query(createQuery, [newUser.twitter_id, newUser.twitter_token, newUser.twitter_username, newUser.display], function(err, rows) {
                if (err)
                  throw err;

                newUser.id = rows.insertId;

                createUserData(rows.insertId)
                  .then(function() {
                    // attach user to request
                    req.user = newUser; // required to work with req.user in subsequent middle wares
                    return done(null, newUser);
                  })
                  .catch(function(err) {
                    return done(err);
                  });
              });
            }
          });
        }
        else {
          // user already exists and is logged in, we have to link accounts
          var user = req.user; // pull the user out of the session

          // update the current users twitter credentials
          user.twitter_id       = profile.id;
          user.twitter_token    = token;
          user.twitter_username = profile.username;
          user.twitter_display  = profile.displayName;

          var updateQuery =
            "UPDATE user " +
            "SET twitter_id=?, twitter_token=?, twitter_username=?, twitter_display=? " +
            "WHERE id=" + user.id + ";";

          connection.query(updateQuery, [profile.id, token, profile.username, profile.displayName], function(err, rows) {
            if (err)
              throw err;

            if(rows.affectedRows = 0) console.error("Could not update user.");

            // attach user to request
            req.user = user; // required to work with req.user in subsequent middle wares
            return done(null, user);
          });

          console.log("Twitter Account has been linked with user.");
        }
      });
    }));
};

/**
 * Create user data for new user.
 *
 * @param userId
 * @returns {Promise}
 */
function createUserData(userId) {

  return new Promise(function(resolve, reject) {

    connection.query("INSERT INTO profile (first_name, last_name) VALUES (?, ?);", ["", ""], function (err, rows) {
      if (err)
        reject(err);

      var profileId = rows.insertId;

      // add profile id to user data
      connection.query("UPDATE user SET profile_id=? WHERE id=?;", [profileId, userId], function (err, rows) {
        if (err)
          reject(err);

        resolve(rows);
      });
    });
  });
}