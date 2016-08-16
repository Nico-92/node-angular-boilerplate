'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  scripts = require('./gulp/scripts'),
  styles = require('./gulp/styles'),
  exec = require('child_process').exec;

// Per fare il require dei task.
require('require-dir')('./gulp');


gulp.task('serve', function() {
  // Start the $.express at the beginning of the task 
  $.express.run(['bin/www']);
  gulp.watch(['app.js', 'libraries/**/*.js', 'routes/**/*.js'], function(){
    $.express.run();
    $.notify('Riavviato');
  });

});

gulp.task('serveFrontend', ['copyAssetstoSrc'], function() {
  // copio file view in src 
  console.log('inizio copia');
  gulp.src(['views/**/*.js', 'views/**/*.html'])
    .pipe(gulp.dest('src'))
    .pipe($.notify('Copia js e html fatta'));

  console.log('inizio js');

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
  gulp.watch(['app.js','routes/**/*.js', 'views/**/*.jade'], $.express.run);

  //frontend
  gulp.watch(['views/**/*.scss', 'views/*.scss'], ['styles']);
});

gulp.task('copyAssetstoSrc', function() {
  gulp.src('views/assets/**/*')
    .pipe($.changed('src/assets'))
    .pipe(gulp.dest('src/assets'))
    .pipe($.notify('Copia di assets fatta'));
});