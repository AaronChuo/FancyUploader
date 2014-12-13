'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({
  pattern: 'gulp-*'
});

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

gulp.task('unit-test', function() {
  return gulp.src('test/unit/**/*.js')
    .pipe($.mocha({
      reporter: 'spec',
      globals: {
        expect: require('chai').expect
      }
    }))
    .on('error', handleError)
    .pipe($.notify({
      title: 'Task: Unit Test',
      message: 'Completed'
    }));
});

gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

gulp.task('webdriver-update', $.protractor.webdriver_update);

gulp.task('e2e-test', ['webdriver-update'], function(done) {
  return gulp.src('test/e2e/**/*.js')
    .pipe($.protractor.protractor({
      configFile: 'test/protractor.conf.js'
    }))
    .on('error', handleError)
    .pipe($.notify({
      title: 'Task: E2E Test',
      message: 'Completed'
    }))
    .on('end', function() {
      browserSync.exit();
      done();
    });
});