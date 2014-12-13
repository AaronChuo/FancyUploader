'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: 'gulp-*'
});

//Error handler
function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

//Build styles
gulp.task('styles', function() {
  var timestamp = new Date().getTime();
  return gulp.src(['src/styles/**/*.scss'])
    .pipe($.compass({
      css: 'css',
      sass: 'sass',
      image: 'images'
    }))
    .on('error', handleError)
    .pipe($.autoprefixer('last 1 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe($.csso())
    .pipe($.rename({
      suffix: '.min',
      extname: '.css?ver=' + timestamp
    }))
    .pipe(gulp.dest('public/styles/'))
    .pipe($.size())
    .pipe($.notify({
      title: 'Task: Sass Preprocessor',
      message: 'Compiled'
    }));
});

//build scripts
gulp.task('scripts', function() {
  return gulp.src(['src/scripts/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.uglify())
    .on('error', handleError)
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/scripts'))
    .pipe($.size())
    .pipe($.notify({
      title: 'Task: JavaScript Optimize',
      message: 'Completed'
    }));
});

gulp.task('build', ['styles', 'scripts']);