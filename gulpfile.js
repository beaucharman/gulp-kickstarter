/**
 *
 *  GulpFile
 *
 */



/**
 * Require Tasks
 */
var gulp  = require('gulp');
var sass  = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');

/* Stylsheets */
var sourceStylesheets = '/library/source/stylesheets';
var destStylesheets = '/library/stylesheets';

/* JavaScripts */
var sourceJavascripts = '/library/source/javascripts';
var destJavascripts = '/library/javascripts';

/* Images */
var sourceImages = '/library/images';
var destImages = '/library/images';



/**
 *
 * Stylesheet Task
 *
 */
gulp.task('styles', function () {

  return gulp.src([sourceStylesheets + '/main.scss'])
    .pipe(sass({
      style: 'expanded'
    }))
    .pipe(autoprefixer(
      'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    ))
    .pipe(gulp.dest(destStylesheets))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest(destStylesheets))
    .pipe(notify({
      message: 'Styles task complete'
    }));

});



/**
 *
 * JavaScript Task
 *
 */
gulp.task('scripts', function () {

  return gulp.src([
      sourceJavascripts + '/vendor/jquery.min.js',
      sourceJavascripts + '/plugins.js',
      sourceJavascripts + '/main.js,'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(destJavascripts))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(destJavascripts))
    .pipe(notify({
      message: 'Scripts task complete'
    }));

});



/**
 *
 * Images
 *
 */
 gulp.task('images', function () {

  return gulp.src([sourceImages + '/*'])
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(destImages))
    .pipe(notify({
      message: 'Images task complete'
    }));

 });



 /**
  *
  * Watch
  *
  */
gulp.task('watch', function () {

  gulp.watch(sourceStylesheets + '/**', ['scripts']);
  gulp.watch(sourceJavascripts + '/**', ['styles']);
  gulp.watch(sourceImages + '/**', ['images']);

});



/**
 *
 * Default task
 *
 */
gulp.task('default', function () {

  gulp.start('styles', 'scripts');

});
