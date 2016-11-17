'use strict';

const fs = require('fs')
const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const plumber = require('gulp-plumber')
const notifier = require('node-notifier')

// const imageResize = require('gulp-image-resize');

const onError = function (error) {
  notifier.notify({
    'title': 'Error',
    'message': error.message
  })

  console.log(error)
  this.emit('end')
}


gulp.task('dev_compile_scss', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    // .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'))
    .pipe(livereload());
});


gulp.task('copy-js', function () {
  gulp.src('./src/js/**/*.js')
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulp.dest('./assets/js'))
    .pipe(livereload());
});

gulp.task('reload', function () {
  gulp.src('./')
    .pipe(livereload());
});

gulp.task('default', function () {
  livereload.listen();
  // gulp.watch('./src/scss/**/*.scss', ['compress_prefix']);
  gulp.watch('./*.html', ['reload']);
  gulp.watch('./*.php', ['reload']);
});

gulp.task('dev', function () {
  livereload.listen();
  gulp.watch('./src/scss/**/*.scss', ['dev_compile_scss']);
  gulp.watch('./src/js/**/*.js', ['copy-js']);

  gulp.watch('./templates/**/*.html5', ['reload']);
  // gulp.watch('./**/*.html', ['reload']);
  // gulp.watch('./**/*.svg', ['reload']);
  // gulp.watch('./**/*.yml', ['reload']);
});
