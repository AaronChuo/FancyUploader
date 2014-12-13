'use strict';

var gulp = require('gulp');

gulp.task('watch', ['server'], function() {
	
	//HTML
	gulp.watch('**/*.html', ['html', 'reload']);

	//Sass
	gulp.watch('public/styles/sass/**/*.scss', ['styles']);

	//CSS
	gulp.watch('public/styles/css/**/*.css', ['reload']);

	//Script
	gulp.watch('public/scripts/**/*.js', ['scripts', 'reload']);

	//Test
	gulp.watch(['tests/unit/*.js', 'public/scripts/**/*.js'], ['unit-test']);
	gulp.watch('tests/e2e/*.js', ['e2e-test']);
});