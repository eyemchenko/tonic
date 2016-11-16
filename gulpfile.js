var gulp = require('gulp');
var imagemin = require('imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminPngquant = require('imagemin-pngquant');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var htmlmin = require('gulp-htmlmin');

//SASS COMPILER
gulp.task('sass', function () {
    return gulp.src('./sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

//SASS LIVE WATCH
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

//SPRITE GENERATOR
gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/sprite/*.{jpg,png}').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        padding: 3
    }));
    return spriteData.pipe(gulp.dest('built'));
});

//IMAGE MIN JPEG RECOMPRESS
gulp.task('jpegrecompress', function () {
    return gulp.src('./src/*.jpg')
        .pipe(imageminJpegRecompress({loops: 3})())
        .pipe(gulp.dest('built'));
});

//IMAGE MIN JPEG RECOMPRESS
gulp.task('pngquant', function () {
    return gulp.src('./src/*.png')
        .pipe(imageminPngquant({quality: '65-80', speed: 4})())
        .pipe(gulp.dest('built'));
});

//IMAGE OPTIMIZATION
gulp.task('imagemin', ['jpegrecompress', 'pngquant'], function () {

});

//HTML MINIFY
gulp.task('minify', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});