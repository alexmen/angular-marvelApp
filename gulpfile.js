var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var webserver = require('gulp-webserver');
var ts = require('gulp-typescript');
var jasmine = require('gulp-jasmine');

gulp.task('default', [
  'webserver'
]);

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      	livereload: true,
      	open: true
    }));
});

