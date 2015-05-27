'use strict';

var gulp = require('gulp');
var childProcess = require('child_process');
var eslint = require('gulp-eslint');

var paths = {
    scripts: ['./BackEnd/app/**/*.js', './*.js']
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

gulp.task('startMongo', function () {
    childProcess.exec('start mongod --config D:/_git/RaspiSense/BackEnd/db/mongodb.conf', function(error) {
        console.log(error);
    });
});

gulp.task('default', ['lint', 'watch']);
