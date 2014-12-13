'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });
});

gulp.task('reload', function() {
  browserSync.reload({
    stream: true,
    once: true
  });
});