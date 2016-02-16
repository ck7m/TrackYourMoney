var source = require("vinyl-source-stream"),
    gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify'),
    debug = require('gulp-debug'),
    gutil = require('gulp-util'),jshint = require('gulp-jshint');

var path = {
  HTML: 'index.html',
  ALL: ['app/*.js','app/js/*.js', 'app/js/**/*.js', 'index.html'],
  JS: ['app/*.js','app/js/*.js', 'app/js/**/*.js'],
  OUT: 'build.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist',
  ENTRY_POINT: './app/app.js'
};

gulp.task('default',['watch','browserify']);

gulp.task('jshint',function(){
  return gulp.src(path.JS).pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch',['copy'], function() {

});

gulp.task("copyFiles", function() {
  var glob = path.ALL;
    var dest = path.DEST;
    console.log("File " + glob + " being moved to " + dest);
    gulp.src(glob)
      .pipe(gulp.dest(dest));
});

gulp.task('copy',['copyFiles'], function() {
  console.log("Watching over copy ");
    var watcherFuncGenerator = function(glob, dest) {
      return function(event) {
        console.log(event);
        console.log("File " + event.path + " was " + event.type + ", running tasks...");
        console.log("File " + glob + " being moved to " + dest);
        gulp.src(glob)
          .pipe(gulp.dest(dest));
      }
    };
    var watchFunc = watcherFuncGenerator(path.ALL, path.DEST);
    gulp.watch(path.ALL, watchFunc);
});

gulp.task('browserify', function() {
  function bundleAndWatchify(app) {
var opts = {
  entries: [app],
  transform: [
    [babelify, {
      presets: ["react"]
    }]
  ],
  debug: true
};
var b = watchify(browserify(opts)),
  output = path.DEST;
b.on("update", bundle);
b.on("log", gutil.log);

function bundle() {
  return b.bundle()
    .on("error", gutil.log.bind(gutil, "Browserify Error"))
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(output));
}
bundle();
}
bundleAndWatchify('./app/main.js');
//gulp.watch('./dist/bundle.js', ['jshint']);
    });
