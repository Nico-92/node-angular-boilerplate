var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  _ = require('lodash-node'),
  bowerFiles = [
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
    "bower_components/angular-cookie/angular-cookie.js"
  ],
  appFiles = ["views/app.js", "views/**/*.js"],
  jsFiles = _.union(bowerFiles, appFiles);

var swallowError = function(error) {
  //If you want details of the error in the console
  console.log(error.toString());
  $.notify(error.toString());
  this.emit('end');
}

var scriptsPath = 'src/scripts';

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

var getJsFiles = function(opt) {
  var opt = _.assign({
    files: jsFiles,
    dir: 'src',
    fileName: 'libs.min.js',
  }, opt);

  return gulp.src(opt.files)
    .pipe($.sourcemaps.init())
    .pipe($.concat(opt.fileName))
    .pipe($.uglify())
    .pipe($.stripDebug())
    .pipe($.sourcemaps.write())
    .on('error', $.notify.onError(function(error) {
      // remove all Before the sass Dir
      var msg = error.message.substr(error.message.indexOf(options.scssDir), 200); //200 is faster then error.message.length - indexOf bla bla bla.
      return "Error: " + msg;
    }))
    .on('error', swallowError)
    .pipe(gulp.dest(opt.dir))
    .pipe($.notify('Script Files Ok'));
};

gulp.task('scripts', function() {
  getJsFiles();
});

module.exports = {
  getJsFiles: getJsFiles,
  bowerFiles: bowerFiles
}