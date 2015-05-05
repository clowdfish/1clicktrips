// include gulp
var gulp = require('gulp');
var karma = require('karma').server;
// include core modules
var path  = require("path");
var fs    = require("fs");
var mkdirp = require('mkdirp');
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
    data        = require('gulp-data'),
    ngAnnotate  = require('gulp-ng-annotate'),
    merge       = require('gulp-merge'),
    angularTemplateCache = require('gulp-angular-templatecache');


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

  /*gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/animate.css/animate.min.css'
  ])
  .pipe(gulp.dest("build/styles"));*/

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
    'bower_components/jquery-ui/jquery-ui.min.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/underscore/underscore-min.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap.min.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js',
    'bower_components/use-angular-translate/src/**/*.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/moment/min/moment.min.js',
    'bower_components/lodash/lodash.min.js',
    'bower_components/use-angular-translate/src/**/*.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/ng-file-upload/angular-file-upload-all.min.js',
    'bower_components/angular-ui-sortable/sortable.min.js',
    'bower_components/ngstorage/ngStorage.min.js',
    'bower_components/fastclick/lib/fastclick.js'
  ])
  .pipe(plumber(plumberErrorHandler))
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('build/scripts'));

  merge(
    gulp.src([
      'scripts/app/templates/**/*'
    ])
    .pipe(angularTemplateCache('templates.js',{
      root: 'scripts/app/templates/',
      module: 'app.templates',
      standalone: true
    })),
    gulp.src([
      'scripts/**/*.js',
      '!scripts/**/*.spec.js',
      '!scripts/mockdata/**/*.js'
    ])
  )
  .pipe(plumber(plumberErrorHandler))
  .pipe(
    gulpif(
      /[.]coffee$/,
      coffee({bare: true})
    )
  )
  .pipe(concat('script.js'))
  .pipe(gulpif(production, ngAnnotate()))
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
      .pipe(angularTemplateCache('templates.js',{
        root: 'scripts/app/templates/',
        module: 'app.templates',
        standalone: true
      }))
      .pipe(gulpif(production, ngAnnotate()))
      .pipe(gulpif(production, uglify()))
      .pipe(gulp.dest('scripts/app/templates'));
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
      noRedeclare: false,
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

gulp.task('create-upload-folder', function() {
  mkdirp('build/images/uploaded');
});
// gulp task suite
gulp.task('live', ['styles', 'scripts', 'images', 'preprocess', 'webserver', 'app-data', 'create-upload-folder'], function() {
  gulp.watch('styles/**/*.scss', ['styles']);
  gulp.watch(["scripts/app/templates/**/*.html"], ['scripts']);
  gulp.watch(['templates/**/*.html', 'i18n/*.yaml'], ['preprocess', 'i18n', 'scripts']);
  gulp.watch(["../config/currencies.json", "../config/languages.json"], ['app-data']);
  gulp.watch(['scripts/app/**/*.js'], ['scripts']);
});

gulp.task('build', ['styles', 'scripts', 'images', 'preprocess', 'app-data', 'create-upload-folder'], function() {});
