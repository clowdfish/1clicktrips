// set up ======================================================================
var express     = require('express'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    session     = require('express-session'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser');

// initiate server instance
var app = express();

// configuration ===============================================================
var configDB = require('./config/database.js');
var port = process.env.PORT || 8080;

require('./config/passport')(passport); // pass passport for configuration

/**
 * General server setup is happening here
 */
function setupServer() {
    mongoose.connect(configDB.url); // connect to database

    app.use(morgan('dev')); // log every request to the console
    app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());     // parse application/json
    app.use(session({secret: 'errare humanum est', resave: true, saveUninitialized: true}));

    app.set('jwtTokenSecret', 'theanswertoallquestions42.whatwas23for?');
}

/**
 * Setup Passport for authentication functionality
 */
function setupAuthentication() {
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions required for Twitter auth
}

/**
 * Start Express
 */
function start () {
  setupServer();
  setupAuthentication();
    
	// load routes with fully configured express and passport
	require('./app/routes.js')(app, express, passport); 

  app.listen(port);
  console.log('\tServer started on port ' + port + '.');
}

// start the server ============================================================
start();
