'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  _ = require('lodash-node');

var getCssFiles = function(opt) {
    var opt = _.assign({
      reloadServer: true
    }, opt)

    var sassOptions = {
      // style: 'expanded'
      "sourcemap=none": true
    };

    var injectFiles = gulp.src([
      'views/**/*.scss',
      '!views/index.scss',
      '!views/vendor.scss'
    ], {
      read: false
    });

    var injectOptions = {
      transform: function(filePath) {
        filePath = filePath.replace('views/', '');
        // filePath = filePath.replace(paths.src + '/components/', '../components/');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    };

    var indexFilter = $.filter('index.scss');

    var styleStream = gulp.src([
        'views/index.scss',
        'views/vendor.scss'
      ])
      .pipe(indexFilter)
      .pipe($.inject(injectFiles, injectOptions))
      .pipe(indexFilter.restore())
      .pipe($.sass.sync().on('error', $.sass.logError))
      .pipe($.autoprefixer()).on('error', function handleError(err) {
        console.error(err.toString());
        this.emit('end');
      })
      // .pipe($.stripComments({
      //   preserve: false
      // }))
      // .pipe($.minifyCss())
      .pipe(gulp.dest('src/'))
      .pipe(gulp.dest('dist/'));

    if (opt.reloadServer != undefined && opt.reloadServer) {
      styleStream.pipe($.express.notify());
    }
    
    return styleStream;
  }

gulp.task('styles', function() {
  return getCssFiles({
    reloadServer: true
  });
});

module.exports = {
  getCssFiles: getCssFiles
}