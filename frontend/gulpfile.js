// include gulp
var gulp = require('gulp');
var karma = require('karma').server;

// include core modules
var path  = require("path");

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
    data        = require('gulp-data'),
    ngAnnotate  = require('gulp-ng-annotate'),
    merge       = require('gulp-merge'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    typescript  = require('gulp-typescript'),
    gulpSequence = require('gulp-sequence');


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
    'bower_components/es6-promise/promise.js',
    'bower_components/lodash/lodash.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
    'bower_components/ng-file-upload/ng-file-upload-shim.js',
    'bower_components/ng-file-upload/ng-file-upload.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-ui-sortable/sortable.js',
    'bower_components/ngDialog/js/ngDialog.js',
    'bower_components/ngstorage/ngStorage.js',
    'bower_components/fastclick/lib/fastclick.js'
  ])
  .pipe(plumber(plumberErrorHandler))
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('build/scripts'));
});

// process and compile all script files
gulp.task('client-scripts', function(done) {


  return merge(
    gulp.src([
      'scripts/app/templates/**/*'
    ])
    .pipe(angularTemplateCache('templates.js', {
      root: 'scripts/app/templates/',
      module: 'app.templates',
      standalone: true
    })),
    gulp.src([
      'scripts/_all.ts',
      'scripts/app/**/*.ts',
      '!scripts/app/**/*.spec.ts'
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

gulp.task('scripts', gulpSequence('vendor-scripts', 'client-scripts'));

// compile angular templates to make them available on client
gulp.task('angular-templates', function() {

  gulp
    .src([
      'scripts/app/templates/**/*'
    ])
    .pipe(angularTemplateCache('templates.js',{
      root: 'scripts/app/templates/',
      module: 'app.templates',
      standalone: true
    }))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('scripts/app/templates'));
});

// copy html files
gulp.task('preprocess', function() {

  gulp.src('index.html')
    .pipe(gulp.dest('build/'));
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

gulp.task('compileTest', function(done) {
  return gulp
    .src(testFiles)
    .pipe(typescript({
      out: 'typscript.js',
      removeComments: true
    }))
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
gulp.task('live', ['styles', 'scripts', 'images', 'preprocess', 'webserver', 'app-data'], function() {

  gulp.watch('styles/**/*.scss', ['styles']);
  gulp.watch(["scripts/app/templates/**/*.html"], ['scripts']);
  gulp.watch(['*.html'], ['preprocess', 'scripts']);
  gulp.watch(["../config/currencies.json", "../config/languages.json"], ['app-data']);
  gulp.watch(['scripts/app/**/*.ts'], ['scripts']);
});

gulp.task('build', ['styles', 'scripts', 'images', 'preprocess', 'app-data'], function() {});

function compileScript() {

}
