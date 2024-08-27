const { src, dest, watch, parallel, series } = require("gulp");
const { init, reload, stream } = require("browser-sync").create();
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const cleanCSS = require("gulp-clean-css");

/**
 * @function
 * @description Initializes a local development server and serves files from the base directory.
 * @param {Function} done - Callback to signal the end of the task.
 */
function browserSync(done) {
  init({
    server: {
      baseDir: "./",
    },
    port: 3000,
  });

  done();
}

/**
 * @function
 * @description Minifies JS files and outputs the result with a `.min` suffix.
 */
function minifyJs() {
  return src(["./src/js/*.js"])
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./assets/js"))
    .pipe(stream()); // Stream changes to all browsers
}

/**
 * @function
 * @description Minifies CSS files and outputs the result with a `.min` suffix.
 */
function minifyCss() {
  return src(["./src/css/*.css"])
    .pipe(cleanCSS()) // Minify CSS files
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./assets/css", { sourcemaps: true }));
}

/**
 * @function
 * @description Reloads the browser page when file changes are detected.
 * @param {Function} done - Callback to signal the end of the task.
 */
function browserSyncReload(done) {
  reload();
  done();
}

/**
 * @function
 * @description Monitors specified files for changes, automatically compiling CSS, JS, and reloading the page.
 */
function watchFiles() {
  watch("./src/**/*.css", minifyCss);
  watch("./assets/**/*.min.css", browserSyncReload);
  watch("./src/**/*.js", minifyJs);
  watch("./assets/**/*.min.js", browserSyncReload);
  watch("./*.html", browserSyncReload);
}

/**
 * @description Main tasks: runs gulp tasks in sequence and in parallel.
 */
const build = parallel(minifyCss, minifyJs);
const server = series(build, browserSync, watchFiles); // Run build first, then browserSync and watch files

/**
 * @description Exported Tasks:
 * - `gulp build` - Minifies JS and CSS files.
 * - `gulp server` - Start the development server and watch files for changes.
 */
exports.build = build;
exports.default = build;
exports.server = server;
