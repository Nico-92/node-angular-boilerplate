'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    scripts = require('./gulp/scripts'),
    styles = require('./gulp/styles'),
    exec = require('child_process').exec;

require('require-dir')('./gulp');


gulp.task('serve', ['copyAssetstoSrc'], function() {
    gulp.src(['views/**/*.js', 'views/**/*.html'])
        .pipe(gulp.dest('src'))
        .pipe($.uglify())
        .pipe($.notify('Copy of js and html: Done'));

    scripts.getJsFiles({
        dir: 'src',
        fileName: 'libs.min.js',
        files: scripts.bowerFiles
    });

    //gulp/styles
    styles.getCssFiles({
        reloadServer: false
    });

    // Start the $.express at the beginning of the task 
    $.express.run(['bin/www']);
    //live reload
    gulp.watch(['app.js', 'routes/**/*.js', 'views/**/*.jade'], $.express.run);
    gulp.watch(['views/**/*.scss', 'views/*.scss'], ['styles']);
});

gulp.task('copyAssetstoSrc', function() {
    gulp.src('views/assets/**/*')
        .pipe($.changed('src/assets'))
        .pipe(gulp.dest('src/assets'))
        .pipe($.notify('Copy of the assets: Done'));
});