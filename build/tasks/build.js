var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var notify = require("gulp-notify");
var browserSync = require('browser-sync');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('build-system', function() {
  return gulp.src(paths.source)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions, {modules: 'system'})))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-html', function() {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-styles', function() {
    return gulp.src(paths.style)
    .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['> 5%', 'Explorer >= 10']
            }))
        .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styleOutput));
});

gulp.task('build-images', function() {
    return gulp.src(paths.image)
        .pipe(gulp.dest(paths.imageOutput));
});

gulp.task('build-fonts', function() {
    return gulp.src(paths.font)
        .pipe(gulp.dest(paths.fontOutput));
});

gulp.task('build-jsx', function() {
   return gulp.src(paths.sourceJsx)
        .pipe(gulp.dest(paths.output)); 
});

gulp.task('build', function(callback) {
    return runSequence(
        'clean',
        ['build-system', 'build-jsx', 'build-html', 'build-styles', 'build-images', 'build-fonts'],
        callback
    );
});
