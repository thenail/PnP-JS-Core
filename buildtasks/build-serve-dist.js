//******************************************************************************
//* build-serve-dist.js
//*
//* Defines a custom gulp task for copying files in the 
//* dist folder to the server-root folder where it 
//* can be served up for running locally in a browser
//******************************************************************************

"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************

var gulp = require("gulp");

//******************************************************************************
//* BUILD-SERVE-DIST
//******************************************************************************

gulp.task("build-serve-dist", ["package-notest"], function() {
    var distFiles = global.TSDist.RootFolder + "/*.{js,map,d.ts}"

    return gulp.src(distFiles)
        .pipe(gulp.dest(global.PnPLocalServer.RootFolder + "/" +  global.PnPLocalServer.ScriptsRootFolder));
});
