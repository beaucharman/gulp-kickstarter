/**
 *
 *	GulpFile
 *
 */

/**
 * Require Tasks
 */
var gulp  = require("gulp");
var sass  = require("gulp-sass");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");



/**
 * Stylsheets 
 */
var sourceStylesheets = "/library/source/stylesheets";
var destStylesheets = "/library/stylesheets";

/**
 * JavaScripts
 */
var sourceJavascripts = "/library/source/javascripts";
var destJavascripts = "/library/javascripts";



/**
 *
 * Stylesheet Task
 *
 */
gulp.task('styles', function () {

  return gulp.src(sourceStylesheets + '/main.scss')
    .pipe(sass({
      style: 'compressed'
    }))
    .pipe(gulp.dest(destStylesheets));

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
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destJavascripts));

});



/**
 *
 * Images
 *
 */
 
 // coming soon...



/**
 * Default task
 */
gulp.task('default', function () {

  gulp.start('styles', 'scripts');
});




