'use strict';

var gulp = require('gulp');
var childProcess = require('child_process');
var eslint = require('gulp-eslint');
var bowerFiles = require('bower-files')({cwd: 'D:/_git/RaspiSense/FrontEnd'});
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-html-replace');

var paths = {
    scripts: ['./BackEnd/app/**/*.js', './*.js'],
    frontEndDist: './FrontEnd/dist/'
};

gulp.task('lint', function () {
    return gulp.src(paths.scripts)// return = callee waits till this task is finished
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['lint']);
});

gulp.task('start_mongo', function () {
    childProcess.exec('start mongod --config D:/_git/RaspiSense/BackEnd/db/mongodb.conf', function (error) {
        console.log(error);
    });
});

gulp.task('replace_html', function () {
    return gulp.src('./FrontEnd/index.html')
        .pipe(replace({
            'jsLibs': 'js/libs.min.js',
            'jsApp': 'js/app.min.js',
            'cssLibs': 'css/libs.concat.css',
            'cssApp': 'css/app.concat.css'
        }))
        .pipe(gulp.dest(paths.frontEndDist));
});

gulp.task('concat', function () {
    gulp.src(bowerFiles.ext('js').files)
        .pipe(concat('js/libs.concat.js'))
        .pipe(gulp.dest(paths.frontEndDist));

    gulp.src(bowerFiles.ext('css').files)
        .pipe(concat('css/libs.concat.css'))
        .pipe(gulp.dest(paths.frontEndDist));

    gulp.src(['./FrontEnd/app/**/*.module.js', './FrontEnd/app/**/*.js'])
        .pipe(concat('js/app.concat.js'))
        .pipe(gulp.dest(paths.frontEndDist));

    return gulp.src('./FrontEnd/css/**/*.css')
        .pipe(concat('css/app.concat.css'))
        .pipe(gulp.dest(paths.frontEndDist));
});

gulp.task('copy_views', function () {
    gulp.src('./FrontEnd/app/modules/**/*.view.html')
        .pipe(gulp.dest(paths.frontEndDist + 'app/modules/'));
});

gulp.task('copy_img', function () {
    gulp.src('./FrontEnd/img/**/*.*')
        .pipe(gulp.dest(paths.frontEndDist + 'img/'));
});

gulp.task('copy_fonts', function () {
    gulp.src(bowerFiles.match('**/glyphicons-halflings-regular.*').files)
        .pipe(gulp.dest(paths.frontEndDist + 'fonts/'));
});

gulp.task('minify', ['concat'], function () {
    gulp.src(paths.frontEndDist + 'js/app.concat.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(paths.frontEndDist + 'js/'));

    gulp.src(paths.frontEndDist + 'js/libs.concat.js')
        .pipe(uglify())
        .pipe(rename('libs.min.js'))
        .pipe(gulp.dest(paths.frontEndDist + 'js/'));
});

gulp.task('default', ['lint', 'watch']);
gulp.task('deploy', ['minify', 'copy_views', 'copy_img', 'copy_fonts', 'replace_html']);
