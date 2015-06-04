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

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['lint']);
});

gulp.task('startMongo', function () {
    childProcess.exec('start mongod --config D:/_git/RaspiSense/BackEnd/db/mongodb.conf', function (error) {
        console.log(error);
    });
});

gulp.task('replace_html', function () {
    return gulp.src('./FrontEnd/index.html')
        .pipe(replace({
            'jsLibs': 'js/libs.concat.js',
            'jsApp': 'js/app.concat.js',
            'cssLibs': 'css/libs.concat.css',
            'cssApp': 'css/app.concat.css'
        }))
        .pipe(gulp.dest('./FrontEnd/dist/'));
});

gulp.task('minify_bower', ['concat_bower'], function () {
    return gulp.src('./FrontEnd/dist/libs.concat.js')
        .pipe(uglify())
        .pipe(rename('libs.min.js'))
        .pipe(gulp.dest('./FrontEnd/dist/'));
});

gulp.task('concat', function () {
    gulp.src(bowerFiles.ext('js').files)
        .pipe(concat('js/libs.concat.js'))
        .pipe(gulp.dest('./FrontEnd/dist/'));

    gulp.src(bowerFiles.ext('css').files)
        .pipe(concat('css/libs.concat.css'))
        .pipe(gulp.dest('./FrontEnd/dist/'));

    gulp.src(['./FrontEnd/app/**/*.module.js', './FrontEnd/app/**/*.js'])
        .pipe(concat('js/app.concat.js'))
        .pipe(gulp.dest('./FrontEnd/dist/'));

    gulp.src('./FrontEnd/css/**/*.css')
        .pipe(concat('css/app.concat.css'))
        .pipe(gulp.dest('./FrontEnd/dist/'));
});

gulp.task('copy_views', function () {
    gulp.src('./FrontEnd/app/modules/**/*.view.html')
        .pipe(gulp.dest('./FrontEnd/dist/app/modules/'));
});

gulp.task('copy_img', function () {
    gulp.src('./FrontEnd/img/**/*.png')
        .pipe(gulp.dest('./FrontEnd/dist/img/'));
});

gulp.task('copy_fonts', function () {
    gulp.src(bowerFiles.match('**/glyphicons-halflings-regular.*').files)
        .pipe(gulp.dest('./FrontEnd/dist/fonts/'));
});

gulp.task('minify', ['concat'], function () {
    return gulp.src('./FrontEnd/dist/app.concat.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./FrontEnd/dist/'));
});

gulp.task('default', ['lint', 'watch']);
gulp.task('deploy', ['concat', 'copy_views', 'copy_img', 'copy_fonts', 'replace_html']);
