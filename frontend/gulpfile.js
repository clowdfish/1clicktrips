// include gulp
var gulp = require('gulp');
var karma = require('karma').server;
// include core modules
var path  = require("path");
var fs    = require("fs");

// include gulp plug-ins
var changed 	  = require('gulp-changed'),
    imagemin 	  = require('gulp-imagemin'),
    concat 		  = require('gulp-concat'),
    coffee      = require('gulp-coffee'),
    stripDebug 	= require('gulp-strip-debug'),
    uglify 		  = require('gulp-uglify'),
    autoprefix  = require('gulp-autoprefixer'),
    minifyCSS 	= require('gulp-minify-css'),
    sass 		    = require('gulp-ruby-sass'),
    notify		  = require('gulp-notify'),
    plumber 	  = require('gulp-plumber'),
    webserver   = require('gulp-webserver'),
    gulpif      = require('gulp-if'),
    declare     = require('gulp-declare'),
    yaml        = require('gulp-yml'),
    yml         = require('js-yaml'),
    compile     = require('gulp-compile-handlebars'),
    data        = require('gulp-data');

/****************************************************************************************************/
/* SETTING UP DEVELOPMENT ENVIRONMENT                                                               */
/****************************************************************************************************/

// development/production flag
var production = false;

// available locales
var locales = ['en', 'de'];

// the title and icon that will be used for notifications
var notifyInfo = {
  title: 'Gulp',
  icon: path.join(__dirname, 'gulp.png')
};

// error notification settings for plumber
var plumberErrorHandler = {
  errorHandler: notify.onError({
    title: notifyInfo.title,
    icon: notifyInfo.icon,
    message: "Error: <%= error.message %>"
  })
};

/****************************************************************************************************/
/* BUILD TASKS                                                                                      */
/****************************************************************************************************/

// copy font-awesome and compile styles
gulp.task('styles', function() {
  gulp.src([
    'bower_components/font-awesome/fonts/*'
  ])
  .pipe(gulp.dest("build/fonts"));

  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/animate.css/animate.css'
  ])
  .pipe(gulp.dest("build/styles"));

  return gulp.src([
    'styles/*.scss'
  ])
  .pipe(plumber(plumberErrorHandler))
  .pipe(sass({ style: 'expanded' }))
  .pipe(gulpif(production, autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1')))
  .pipe(gulpif(production, minifyCSS()))
  .pipe(gulp.dest('build/styles'));
});

// minify images
gulp.task('images', function() {
  var imgSrc = 'images/**/*',
      imgDst = 'build/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// start development web server
gulp.task('webserver', function() {
  gulp.src('build/')
    .pipe(webserver({
      livereload: true,
      open: 'en/',
      proxies: [
        { source: '/api', target: 'http://localhost:8080/'}
      ]
    }));
});

// process and compile all script files
gulp.task('scripts', ['i18n'], function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/underscore/underscore.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
    'bower_components/use-angular-translate/src/**/*.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/moment/moment.js',
    'bower_components/lodash/lodash.js',
    'bower_components/use-angular-translate/src/**/*.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'scripts/**/*.js',
    '!scripts/**/*.spec.js'
  ])
  .pipe(plumber(plumberErrorHandler))
  .pipe(
    gulpif(
      /[.]coffee$/,
      coffee({bare: true})
    )
  )
  .pipe(concat('script.js'))
  .pipe(gulpif(production, stripDebug()))
  .pipe(gulpif(production, uglify()))
  .pipe(gulp.dest('build/scripts'));
});

// compile angular templates to make them available on client
gulp.task('angular-templates', function() {

  locales.forEach( function( locale ) {
    gulp
      .src([
        'scripts/app/templates/**/*'
      ])
      .pipe(gulp.dest(path.join('build/', locale, 'scripts/app/templates')));
  });
});

// compile html files and replace language strings
gulp.task('preprocess', function() {

  locales.forEach( function( locale ) {
    var templateData = {
      T: yml.safeLoad(fs.readFileSync('./i18n/' + locale + '.yaml', 'utf8'))[locale],
      locale: locale,
      production: production
    },
    options = {
      batch : ['templates/modules', 'templates/partials'],
      helpers : {
        capitals : function(str) {
            return str.toUpperCase();
        }
      }
    };

    gulp.src('templates/*.html')
      .pipe(plumber(plumberErrorHandler))
      .pipe(compile(templateData, options))
      .pipe(gulp.dest(path.join('build/', locale)));
  });
});


// create translation file
gulp.task('i18n', function() {
  gulp.src('i18n/*.yaml')
    .pipe(plumber(plumberErrorHandler))
    .pipe(yaml().on( "error", console.error ))
    .pipe(declare({
      namespace: 'Locales',
      noRedeclare: true,
      root: 'window'
    }))
    .pipe(concat('locales.js'))
    .pipe(gulp.dest('scripts/locale/'));
});

gulp.task('app-data', function() {
  gulp
    .src("../config/currencies.json")
    .pipe(plumber(plumberErrorHandler))
    .pipe(data(function(){}))
    .pipe(declare({
      namespace: 'AppData',
      noRedeclare: false,
      root: 'window'
    }))
    .pipe(concat('currencies.js'))
    .pipe(gulp.dest('scripts/data'));

  gulp
    .src("../config/languages.json")
    .pipe(plumber(plumberErrorHandler))
    .pipe(data(function(){}))
    .pipe(declare({
      namespace: 'AppData',
      noRedeclare: false,
      root: 'window'
    }))
    .pipe(concat('languages.js'))
    .pipe(gulp.dest('scripts/data'));
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);
});

// gulp task suite
gulp.task('live', ['styles', 'scripts', 'images', 'preprocess', 'webserver', 'angular-templates', 'app-data'], function() {
  gulp.watch('styles/**/*.scss', ['styles']);
  gulp.watch(['scripts/app/**/*.js'], ['scripts']);
  gulp.watch(['scripts/app/**/*.html'], ['angular-templates']);
  gulp.watch(['templates/**/*.html', 'i18n/*.yaml'], ['preprocess', 'i18n', 'scripts']);
  gulp.watch(['scripts/templates/**/*.html'], ['angular-templates']);
  gulp.watch(["../config/currencies.json", "../config/languages.json"], ['app-data']);
});

gulp.task('build', ['styles', 'scripts', 'images', 'preprocess', 'angular-templates', 'app-data'], function() {});
