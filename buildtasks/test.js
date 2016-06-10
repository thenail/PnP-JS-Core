//******************************************************************************
//* test.js
//*
//* Defines a custom gulp task for executing the unit tests (with mocha) and
//* also reporting on code coverage (with istanbul).
//******************************************************************************

"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************

var gulp = require("gulp"),
    mocha = require("gulp-mocha"),
    istanbul = require("gulp-istanbul"),
    tsc = require("gulp-typescript");

//******************************************************************************
//* TEST
//******************************************************************************

gulp.task("build-tests", ["clean"], function() {
    var src = global.TSWorkspace.Tests.slice(0);
    src.push(global.TSTypings.Main);

    return gulp.src(src)
        .pipe(tsc(global.tsProject))
        .pipe(gulp.dest(global.TSCompiledOutput.TestRootFolder));
});

gulp.task("test", ["build", "build-tests", "istanbul:hook"], function() {
    return gulp.src(global.TSCompiledOutput.JSTestFiles)
        .pipe(mocha({ ui: 'bdd', reporter: 'dot' }))
        .pipe(istanbul.writeReports());
});
