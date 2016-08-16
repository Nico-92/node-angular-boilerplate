'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var swallowError = function(error) {
    //If you want details of the error in the console
    console.log(error.toString());
    $.notify(error.toString());
    this.emit('end');
}

var uglifyFunc = function(opt){
    return gulp.src(opt.files)
        .pipe($.uglify(opt.filename))
        .on('error', $.notify.onError(function (error) {
                // remove all Before the sass Dir
                var msg = error.message.substr( error.message.indexOf(options.scssDir) , 200); //200 is faster then error.message.length - indexOf bla bla bla.
                return "Error: " + msg;
            }))
        .on('error', swallowError)
        .pipe(gulp.dest(opt.dest))
        .pipe($.notify(opt.messagge));    
    };

gulp.task('build',['scripts','styles'],function(){
});

gulp.task('build_lib_scripts',function(){
            // "bower_components/jquery/dist/jquery.js",
    var opt={
        files:[
            "bower_components/angular/angular.js",
            "bower_components/angular-sanitize/angular-sanitize.js",
            "bower_components/angular-messages/angular-messages.js",
            "bower_components/angular-bind-html-compile/angular-bind-html-compile.js",
            "bower_components/angular-mass-autocomplete/massautocomplete.js",
            "bower_components/lodash/lodash.js",
            "bower_components/jquery/dist/jquery.js",
            "bower_components/jquery.cookie/jquery.cookie.js",
            "bower_components/bootstrap-sass/assets/javascripts/bootstrap.js",
            "bower_components/angular-google-maps/dist/angular-google-maps.js",
            "bower_components/angular-cookie/angular-cookie.js",
            "bower_components/imagesloaded/imagesloaded.pkgd.js",
            "bower_components/sidr/jquery.sidr.min.js",
            "bower_components/masonry/dist/masonry.pkgd.js"
        ],
        filename: 'libs.min.js',
        dest: 'src',
        message: "The SCRIPTS are Gulpisize ;) !"
    };
    console.log(opt.filename);
    uglifyFunc(opt);
});

// gulp.task('serve_scripts',function(){
// });