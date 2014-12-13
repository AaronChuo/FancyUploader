'use strict';

var gulp = require('gulp');

require('require-dir')('./tasks');

gulp.task('default', ['server', 'watch'], function () {
  gulp.start('build');
});