/**
 * @description Load gulp plugins.
 */
const gulp = require("gulp");
const sync = require("browser-sync").create();
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const vinylPaths = require("vinyl-paths");

/**
 * @function
 * @description Allows browser sync.
 * @param {Function} done
 */
function browserSync(done) {
  sync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });

  done();
}

/**
 * @function
 * @description Reload current page in browser.
 * @param {Function} done
 */
function browserSyncReload(done) {
  sync.reload();
  done();
}

/**
 * @function
 * @description Minify js files.
 */
function js() {
  return gulp
    .src(["./js/*.js", "!./js/*.min.js"])
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./js"))
    .pipe(sync.stream());
}

/**
 * @function
 * @description Minify css files.
 */
function css() {
  return gulp
    .src("./css/*.css")
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest("./css"))
    .pipe(sync.stream());
}

/**
 * @function
 * @description Remove minified css files duplicate.
 */
function removeMinCss() {
  return gulp.src("./css/*.min.css").pipe(vinylPaths(del));
}

/**
 * @function
 * @description Watch source files for auto reload function.
 */
function watchFiles() {
  gulp.watch("./src/css/*", browserSyncReload);
  gulp.watch("./js/*.js", browserSyncReload);
  gulp.watch("./*.html", browserSyncReload);
}

/**
 * @description Gulp tasks
 */
const build = gulp.series(removeMinCss, gulp.parallel(js, css));
const server = gulp.series(
  build,
  browserSync,
  gulp.parallel(browserSyncReload, watchFiles)
);

/**
 * @description Run "gulp" or "gulp build" to generate production files.
 */
exports.build = build;
exports.default = build;

/**
 * @description Run "gulp server" to start development server, access in port 3000.
 */
exports.server = server;
