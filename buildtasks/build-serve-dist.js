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

var gulp = require("gulp"),
    plumber = require('gulp-plumber');

//******************************************************************************
//* BUILD-SERVE-DIST
//******************************************************************************

//   var onError = function(err) {
//         notify.onError({
//                     title:    "Gulp",
//                     subtitle: "Failure!",
//                     message:  "Error: <%= error.message %>",
//                     sound:    "Beep"
//                 })(err);

//         this.emit('end');
//     };

//    return gulp.src('assets/scss/global.scss')
//        .pipe(plumber({errorHandler: onError}))

gulp.task("build-serve-dist", ["package-serve"], function() {
    var distFiles = global.TSDist.RootFolder + "/*.{js,map,d.ts}"

    return gulp.src(distFiles)
        .pipe(gulp.dest(global.PnPLocalServer.RootFolder + "/" +  global.PnPLocalServer.ScriptsRootFolder));
});
