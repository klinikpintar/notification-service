var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var del = require("del");


// Task which would transpile typescript to javascript
gulp.task("typescript", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});

// Task which would delete the old dist directory if present
gulp.task("build-clean", function () {
    return del(["./dist"]);
});

// Copy templates file
gulp.task("templates", function () {
    return gulp.src("./src/templates/**/*").pipe(gulp.dest("./dist/templates"));
});

gulp.task("watch", gulp.series("typescript", "templates"), () => {
  console.log("Done");
});

// The default task which runs at start of the gulpfile.js
gulp.task("default", gulp.series("build-clean", "typescript", "templates"), () => {
    console.log("Done");
});
