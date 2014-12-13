// include gulp
var gulp = require('gulp');

// include core modules
var path  = require("path");
var fs = require("fs");

// include gulp plug-ins
var jshint      = require('gulp-jshint'),
    changed 	= require('gulp-changed'),
    imagemin 	= require('gulp-imagemin'),
    minifyHTML 	= require('gulp-minify-html'),
    concat 		= require('gulp-concat'),
    rename		= require('gulp-rename'),
    stripDebug 	= require('gulp-strip-debug'),
    uglify 		= require('gulp-uglify'),
    autoprefix 	= require('gulp-autoprefixer'),
    minifyCSS 	= require('gulp-minify-css'),
    sass 		= require('gulp-ruby-sass'),
    notify		= require('gulp-notify'),
    plumber 	= require('gulp-plumber'),
    ts          = require('gulp-typescript'),
    webserver   = require('gulp-webserver'),
    gulpif = require('gulp-if'),
    declare = require('gulp-declare'),
    wrap = require('gulp-wrap'),
    yaml = require('gulp-yml'),
    yml = require('js-yaml'),
    compile = require('gulp-compile-handlebars'),
    handlebars = require('gulp-handlebars');

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

/****************************************************************************************************/
/* BUILD TASKS                                                                                      */
/****************************************************************************************************/

// minify new images
gulp.task('imagemin', function() {
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist';

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

// run tests once and exit
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

var production = false;

gulp.task('translate', function() {
  var translations = ['pl', 'en'];

  translations.forEach(function(translation){
    gulp.src('app/views/**/*.html')
      .pipe(translate('./locales/'+ translation +'.yml'))
      .pipe(gulp.dest('dist/views/' + translation));
  });
});

gulp.task('tim-styles', function() {
    gulp.src(['bower_components/font-awesome/fonts/*']).pipe(gulp.dest("build/fonts"));
    gulp.src(['bower_components/messenger/build/css/messenger-theme-flat.css']).pipe(gulp.dest("build/styles"));
    gulp.src(['bower_components/jt.timepicker/jquery.timepicker.css']).pipe(gulp.dest("build/styles"));
    gulp.src(['bower_components/pikaday/css/pikaday.css']).pipe(gulp.dest("build/styles"));
    //gulp.src(['bower_components/jquery.ui/themes/base/all.css']).pipe(gulp.dest("build/styles"));
    return gulp.src(['styles/*.scss'])
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass({ style: 'expanded' }))
        //.pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('build/styles'));
});

gulp.task('images', function() {
    var imgSrc = 'src/images/**/*',
        imgDst = 'build/images';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

gulp.task('webserver', function() {
  gulp.src('build/')
    .pipe(webserver({
      livereload: true,
      open: 'en/'
    }));
});

gulp.task('tim-scripts', ['i18n', 'templates'], function() {
  gulp.src(
    [
      'bower_components/handlebars/handlebars.runtime.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/velocity/velocity.js',
      'bower_components/jt.timepicker/jquery.timepicker.js',
      'bower_components/Sortable/Sortable.js',
      'bower_components/underscore/underscore.js',
      'bower_components/backbone/backbone.js',
      'bower_components/mediator-js/lib/mediator.js',
      'bower_components/moment/moment.js',
      'bower_components/pikaday/pikaday.js',
      'scripts/V.ts',
      'scripts/locales.js',
      'scripts/templates.js',
      'scripts/ajax.ts',
      'scripts/utils.ts',
      'scripts/models/*.ts',
      'scripts/controllers/*.ts',
      'scripts/views/*.ts',
      'scripts/app.ts',
      'scripts/main.ts'
    ]
  ).pipe(
    gulpif(
      /[.]ts$/,
      ts({
        declarationFiles: false,
        noExternalResolve: false,
        target: "ES5"
      })
    )
  )
  .pipe(concat('script.js'))
  //.pipe(stripDebug())
  //.pipe(gulpif(production, uglify()))
  .pipe(gulp.dest('build/scripts'));
});

gulp.task('templates', function() {
  gulp.src('templates/dynamic/*.hbs')
      .pipe(handlebars())
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
        namespace: 'Tmpl',
        noRedeclare: true, // Avoid duplicate declarations
      }))
      .pipe(concat('templates.js'))
      .pipe(gulp.dest('scripts/'));
});

gulp.task('preprocess', function() {
  var locales = ['en', 'de'];

  locales.forEach( function( locale ) {
    var templateData = {
      T: yml.safeLoad(fs.readFileSync('./i18n/' + locale + '.yaml', 'utf8'))[locale],
      locale: locale,
      production: production
    },
    options = {
      batch : ['templates/modules', 'templates/partials'],
      helpers : {
          capitals : function(str){
              return str.toUpperCase();
          }
      }
    }
    gulp.src('templates/*.html')
    .pipe(compile(templateData, options))
    .pipe(gulp.dest(path.join('build/', locale)));
  });

});

gulp.task('mock', function() {
  gulp.src('mock/*')
      .pipe(
        gulpif(!production,gulp.dest('build/mock'))
      );
});

gulp.task('i18n', function() {
    gulp.src('i18n/*.yaml')
        .pipe(yaml().on( "error", console.error ))
        .pipe(declare({
          namespace: 'Locales',
          noRedeclare: true,
          root: 'window'
        }))
        .pipe(concat('locales.js'))
        .pipe(gulp.dest('scripts/'));
});

// DEVELOPMENT

gulp.task('preview', ['tim-styles', 'mock', 'tim-scripts', 'images', 'preprocess', 'webserver'], function() {
  gulp.watch('styles/**/*.scss', ['tim-styles']);
  gulp.watch('templates/**/*.hbs', ['tim-scripts']);
  gulp.watch('scripts/**/*.ts', ['tim-scripts']);
  gulp.watch('mock/**/*.json', ['mock']);
  gulp.watch(['templates/**/*.html', 'i18n/*.yaml'], ['preprocess']);
});

gulp.task('build', ['tim-styles', 'mock', 'tim-scripts', 'images', 'preprocess'], function() {});

// PRODUCTION

gulp.task('setproduction', function() {
  production = true;
})

gulp.task('preview:production', ['setproduction', 'preview'], function() {
  //production = true;
  //gulp.tasks.preview.fn();
});

gulp.task('build:production', ['setproduction', 'build'], function() {
});
