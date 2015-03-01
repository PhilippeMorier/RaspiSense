'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

var paths = {
    scripts: ['./app/**/*.js', './*.js']
};

gulp.task('lint', function () {
    return gulp.src(paths.scripts)// return = callee waits till this task is finished
        .pipe(eslint())
        .pipe(eslint.format())
        .on('end', function () {
            //console.log('[My Output] eslint ended');
        });
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['lint']);
});

gulp.task('default', ['lint', 'watch']);
