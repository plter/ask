/**
 * Created by plter on 2016/11/22.
 */

const gulp = require("gulp");
const destDir = "build";
const sourceDir = "src";

gulp.task("copy_package_json", function () {
    gulp.src(`${sourceDir}package.json`).pipe(gulp.dest(destDir));
});

gulp.task("copy_template_files", function () {
    gulp.src(`${sourceDir}/views/**/*.ejs`).pipe(gulp.dest(`${destDir}/views`));
});

gulp.task("copy_static_files", function () {
    gulp.src(`${sourceDir}/public/**/*`).pipe(gulp.dest(`${destDir}/public`));
});

gulp.task("copy_js_files", function () {
    gulp.src(`${sourceDir}/bin/www`).pipe(gulp.dest(`${destDir}/bin`));
    gulp.src(`${sourceDir}/app.js`).pipe(gulp.dest(destDir));
    gulp.src(`${sourceDir}/routes/**/*.js`).pipe(gulp.dest(`${destDir}/routes`));
    gulp.src(`${sourceDir}/ts/**/*.js`).pipe(gulp.dest(`${destDir}/ts`));
});

gulp.task("default", [
    "copy_package_json",
    "copy_template_files",
    "copy_static_files",
    "copy_js_files"
]);