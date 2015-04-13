// Karma configuration
// Generated on Wed Feb 04 2015 17:17:29 GMT+0700 (ICT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyC9-ZIG4bma6FIUumqPyYwWTlU-Gc5QnMY',
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/jquery-ui/jquery-ui.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/underscore/underscore-min.js',
      'bower_components/angular-ui-bootstrap-bower/ui-bootstrap.min.js',
      'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/moment/min/moment.min.js',
      'bower_components/lodash/lodash.min.js',
      'bower_components/use-angular-translate/src/translate.js',
      'bower_components/use-angular-translate/src/**/*.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      'bower_components/ng-file-upload/angular-file-upload-all.min.js',
      'bower_components/angular-ui-sortable/sortable.min.js',
      'bower_components/ngstorage/ngStorage.min.js',
      'scripts/**/*.js',
      'scripts/**/*.spec.js',
      'scripts/**/*.html'
    ],


    // list of files to exclude
    exclude: [

    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'scripts/**/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'app.templates'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
