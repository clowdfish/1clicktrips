// include gulp
var gulp = require('gulp');
var karma = require('karma').server;

// include core modules
var path  = require("path");
var fs = require('fs');

// include gulp plug-ins
var concat 		  = require('gulp-concat'),
    uglify 		  = require('gulp-uglify'),
    autoprefix  = require('gulp-autoprefixer'),
    sass 		    = require('gulp-ruby-sass'),
    notify		  = require('gulp-notify'),
    plumber 	  = require('gulp-plumber'),
    webserver   = require('gulp-webserver'),
    declare     = require('gulp-declare'),
    yml         = require('js-yaml'),
    yaml        = require('gulp-yaml'),
    data        = require('gulp-data'),
    ngAnnotate  = require('gulp-ng-annotate'),
    merge       = require('gulp-merge'),
    angularTemplateCache
                = require('gulp-angular-templatecache'),
    typescript  = require('gulp-typescript'),
    gulpSequence
                = require('gulp-sequence'),
    compile     = require('gulp-compile-handlebars'),
    insert      = require('gulp-insert');


/****************************************************************************************************/
/* SETTING UP DEVELOPMENT ENVIRONMENT                                                               */
/****************************************************************************************************/

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

var testFiles = [
  'scripts/test/_test.ts',
  'scripts/test/**/*.ts"'
];

/****************************************************************************************************/
/* BUILD TASKS                                                                                      */
/****************************************************************************************************/

// copy font awesome and compile styles
gulp.task('styles', function() {

  gulp.src([
    'bower_components/font-awesome/fonts/*'
  ])
  .pipe(gulp.dest("build/fonts"));

  gulp.src([
    'bower_components/ngDialog/css/ngDialog.css',
    'bower_components/ngDialog/css/ngDialog-theme-default.css'
  ])
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('build/styles'));

  return sass('styles', { style: 'expanded' })
    .on('error', function (err) {
      console.error('Error during scss compilation: ', err.message);
    })
    .pipe(autoprefix({
        browsers: ['last 2 version'],
        cascade: true
      }))
    .pipe(gulp.dest('build/styles'));
});

// copy images
gulp.task('images', function() {
  gulp.src('images/**/*')
    .pipe(gulp.dest('build/images'));
});

// start development web server
gulp.task('webserver', function() {
  gulp.src('build/')
    .pipe(webserver({
      livereload: true,
      open: '/',
      proxies: [
        { source: '/api', target: 'http://localhost:8080/' }
      ]
    }));
});

gulp.task('vendor-scripts', function(done) {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/moment/moment.js',
    'bower_components/moment-timezone/builds/moment-timezone-with-data.js',
    'bower_components/es6-promise/promise.js',
    'bower_components/lodash/lodash.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
    'bower_components/ng-file-upload/ng-file-upload-shim.js',
    'bower_components/ng-file-upload/ng-file-upload.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-ui-sortable/sortable.js',
    'bower_components/ngDialog/js/ngDialog.js',
    'bower_components/ngstorage/ngStorage.js',
    'bower_components/fastclick/lib/fastclick.js',
    'bower_components/angular-translate/angular-translate.min.js'
  ])
  .pipe(plumber(plumberErrorHandler))
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('build/scripts'));
});

// process and compile all script files
gulp.task('client-scripts', function(done) {


  return merge(
    gulp.src([
      'app/templates/**/*'
    ])
    .pipe(angularTemplateCache('templates.js', {
      root: 'app/templates/',
      module: 'app.templates',
      standalone: true
    })),
    gulp.src([
      'app/scripts/_all.ts',
      'app/scripts/**/*.ts',
      '!app/test/**/*.spec.ts'
    ])
    .pipe(typescript({
      out: 'typscript.js',
      removeComments: true
    }))
  )
  .pipe(plumber(plumberErrorHandler))
  .pipe(concat('script.js'))
  .pipe(ngAnnotate())
  .pipe(gulp.dest('build/scripts'));
});

gulp.task('scripts', function(done) {
  gulpSequence('vendor-scripts', 'client-scripts')(done);
});

// compile angular templates to make them available on client
gulp.task('angular-templates', function() {

  gulp
    .src([
      'app/templates/**/*'
    ])
    .pipe(angularTemplateCache('templates.js',{
      root: 'app/templates/',
      module: 'app.templates',
      standalone: true
    }))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('app/templates'));
});

// copy html files
gulp.task('preprocess', function() {
  var locales = getLocales();
  locales.forEach(function(locale) {
    var templateData = {
      locale: locale,
      T: yml.safeLoad(fs.readFileSync('./i18n/' + locale + '.yaml', 'utf8'))
    };
    gulp
      .src('index.html')
      .pipe(plumber(plumberErrorHandler))
      .pipe(compile(templateData))
      .pipe(gulp.dest(path.join('build/', locale)));

    gulp
      .src('bower_components/angular-i18n/angular-locale_' + locale + '.js')
      .pipe(plumber(plumberErrorHandler))
      .pipe(gulp.dest('build/scripts'));
  });

  /**
   * En is default language when user visit "/"
   */
  gulp
    .src('index.html')
    .pipe(plumber(plumberErrorHandler))
    .pipe(compile({
      locale: null,
      T: yml.safeLoad(fs.readFileSync('./i18n/en.yaml', 'utf8'))
    }))
    .pipe(gulp.dest('build/'));

});

gulp.task('i18n', function() {
  return gulp.src('i18n/*.yaml')
    .pipe(plumber(plumberErrorHandler))
    .pipe(yaml().on( "error", console.error ))
    .pipe(declare({
      namespace: 'Locales',
      noRedeclare: false,
      root: 'window'
    }))
    .pipe(concat('locales.js'))
    .pipe(gulp.dest('build/scripts/'));
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
    .pipe(gulp.dest('build/data'));

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
    .pipe(gulp.dest('build/data'));
});

gulp.task('compileTest', function(done) {
  return gulp
    .src(testFiles)
    .pipe(typescript({
      out: 'typscript.js',
      removeComments: true
    }))
    .pipe(insert.prepend('var locale = "en";')) //Prevent language redirect
    .pipe(plumber(plumberErrorHandler))
    .pipe(concat('test.js'))
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('runTest', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    autoWatch: false,
    singleRun: true
  }, done);
});

gulp.task('test', gulpSequence('scripts', 'compileTest', 'runTest'));

// gulp task suite
gulp.task('build', gulpSequence(['i18n', 'scripts'], 'styles', 'images', 'preprocess', 'app-data'));

gulp.task('live', ['build', 'webserver'], function() {
  gulp.watch('styles/**/*.scss', ['styles']);
  gulp.watch(['app/templates/**/*.html'], ['scripts']);
  gulp.watch(['*.html'], ['preprocess', 'scripts']);
  gulp.watch(["../config/currencies.json", "../config/languages.json"], ['app-data']);
  gulp.watch(['app/scripts/**/*.ts'], ['scripts']);
  gulp.watch(['i18n/*.yaml'], ['i18n']);
});

function getLocales() {
  var languages = require('../config/languages.json');
  var result = [];
  for (var i = 0; i < languages.length; i++) {
    result.push(languages[i].code);
  }
  return result;
}