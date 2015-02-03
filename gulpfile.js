// include gulp
var gulp = require('gulp');

// include karma test runner
var karma = require('karma').server;

// include core modules
var path        = require("path");

// include gulp plug-ins
var notify		= require('gulp-notify'),
    plumber 	= require('gulp-plumber');

/****************************************************************************************************/
/* SETTING UP DEVELOPMENT ENVIRONMENT                                                               */
/****************************************************************************************************/

// the title and icon that will be used for notifications
var notifyInfo = {
    title: 'Gulp',
    icon: path.join(__dirname, 'gulp.png')
};

// error notification settings for plumber
var plumberErrorHandler = { errorHandler: notify.onError({
    title: notifyInfo.title,
    icon: notifyInfo.icon,
    message: "Error: <%= error.message %>"
    })
};

/****************************************************************************************************/
/* DEVELOPMENT TASKS                                                                                */
/****************************************************************************************************/

// start Karma for TDD
gulp.task('dev-test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done);
});

/****************************************************************************************************/
/* GULP TASK SUITES                                                                                 */
/****************************************************************************************************/

// ----------------------- Development Tasks ----------------------- //
gulp.task('live', [], function() {

    // watch for CSS changes
    gulp.watch('./app/**/*.ts', ['typescript']);

    //reload when files change
    gulp.watch('./app/**/*.js', function(event) {
        onModification(event);
    });

    function onModification (event) {
        gulp.src(event.path)
            .pipe(plumber())
            .pipe(notify({
                title: notifyInfo.title,
                icon: notifyInfo.icon,
                message: event.path.replace(__dirname, '').replace(/\\/g, '/') + ' was ' + event.type + ' and reloaded'
            }));
    }
});

gulp.task('test', ['dev-test'], function() {

    //reload when files change
    gulp.watch('./app/**/*.js', function(event) {
        onModification(event);
    });

    function onModification (event) {
        gulp.src(event.path)
            .pipe(plumber())
            .pipe(notify({
                title: notifyInfo.title,
                icon: notifyInfo.icon,
                message: event.path.replace(__dirname, '').replace(/\\/g, '/') + ' was ' + event.type + ' and reloaded'
            }));
    }
});
