'use strict';

import gulp from 'gulp';

gulp.task('clean', () => {
    let del = require('del');
    return del(['static/css/']);
});

// Build

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]

gulp.task('css', ['clean'], () => {
  let sourcemaps = require('gulp-sourcemaps');
  let stylus = require('gulp-stylus');
  let autoprefixer = require('gulp-autoprefixer');
  let csso = require('gulp-csso');
  let plumber = require('gulp-plumber');
  let util = require('gulp-util');
  return gulp.src('./src/stylus/main.styl')
    .pipe(plumber({
      errorHandler: (err) => {
        util.log(util.colors.red(`Error (${err.plugin}): ${err.message}`));
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./static/css'));
});

gulp.task('image', () => {
    const imagemin = require('gulp-imagemin');
    const pngquant = require('imagemin-pngquant');
    const svgo = require('imagemin-svgo');
    return gulp.src('src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [
                pngquant(),
                svgo()
            ]
        }))
        .pipe(gulp.dest('./static/img'));
});

gulp.task('watch', () => {
  gulp.watch('./src/stylus/**/*.styl', ['css']);
});

// Common

gulp.task('default', ['css', 'image']);
