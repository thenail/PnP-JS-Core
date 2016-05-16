//******************************************************************************
//* package.js
//* 
//* Defines a custom gulp task for creaing pnp.js, pnp.min.js, 
//* and pnp.min.js.map in the dist folder
//******************************************************************************

"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************

var gulp = require("gulp"),
    tsc = require("gulp-typescript"),
    browserify = require("browserify"),
    uglify = require("gulp-uglify"),
    src = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    header = require('gulp-header'),
    srcmaps = require("gulp-sourcemaps"),
    merge = require("merge2"),
    replace = require("gulp-replace");

// we need to build src (es5, umd) -> build
// we need to package the definitions in a single file -> dist
// we need to build src (es6, es6) -> lib
// we need to browsify build/src -> dist
// we need to browsify & uglify build/src -> dist

function packageDefinitions() {

    console.log(global.TSDist.RootFolder + "/" + global.TSDist.DefinitionFileName);

    var src = global.TSWorkspace.Files.slice(0);
    src.push(global.TSTypings.Main);
    src.push("!src/sharepoint/provisioning/**/*.*");

    var src2 = ["src/sharepoint/provisioning/**/*.ts"];
    src2.push(global.TSTypings.Main);

    // create a project specific to our typings build and specify the outFile. This will result
    // in a single pnp.d.ts file being creating and piped to the typings folder
    var typingsProject = tsc.createProject('tsconfig.json', { "declaration": true, "outFile": "pnp.js", "removeComments": false });
    var typingsProject2 = tsc.createProject('tsconfig.json', { "declaration": true, "outFile": "pnp-provisioning.js", "removeComments": false });

    return merge([
        gulp.src(src)
            .pipe(tsc(typingsProject))
            .dts.pipe(gulp.dest(global.TSDist.RootFolder)),
        gulp.src(src2)
            .pipe(tsc(typingsProject2))
            .dts.pipe(gulp.dest(global.TSDist.RootFolder))
    ]);
}

function packageLib() {

    var src = global.TSWorkspace.Files.slice(0);
    src.push(global.TSTypings.Main);
    // use these only instead of main when targetting es6
    // src.push("./typings/main/ambient/sharepoint/index.d.ts");
    // src.push("./typings/main/ambient/whatwg-fetch/index.d.ts");
    // src.push("./typings/main/ambient/microsoft.ajax/index.d.ts");
    // src.push("./typings/main/ambient/jquery/index.d.ts");

    // setup our es5 project to create the lib folder in dist
    var packageProject = tsc.createProject({
        "declaration": true,
        "removeComments": false,
        "module": "es5",
        "target": "es5",
        "jsx": "react"
    });

    var built = gulp.src(src).pipe(tsc(packageProject));

    return merge([
        built.dts.pipe(gulp.dest(global.TSDist.SrcFolder)),
        built.js.pipe(gulp.dest(global.TSDist.SrcFolder)),
    ]);
}

function packageBundle() {

    console.log(global.TSDist.RootFolder + "/" + global.TSDist.BundleFileName);

    return browserify('./build/src/pnp.js', {
        debug: false,
        standalone: '$pnp',
    }).ignore('*.d.ts').bundle()
        .pipe(src(global.TSDist.BundleFileName))
        .pipe(replace(/Object\.defineProperty\(exports, "__esModule", \{ value: true \}\);/ig, ""))
        .pipe(replace(/exports.default = PnP;/ig, "return PnP;"))
        .pipe(buffer())
        .pipe(header(banner, { pkg: global.pkg }))
        .pipe(gulp.dest(global.TSDist.RootFolder));
}

function packageBundleUglify() {

    console.log(global.TSDist.RootFolder + "/" + global.TSDist.MinifyFileName);
    console.log(global.TSDist.RootFolder + "/" + global.TSDist.MinifyFileName + ".map");

    return browserify('./build/src/pnp.js', {
        debug: false,
        standalone: '$pnp',
    }).ignore('*.d.ts').bundle()
        .pipe(src(global.TSDist.MinifyFileName))
        .pipe(replace(/Object\.defineProperty\(exports, "__esModule", \{ value: true \}\);/ig, ""))
        .pipe(replace(/exports.default = PnP;/ig, "return PnP;"))
        .pipe(buffer())
        .pipe(srcmaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(header(banner, { pkg: global.pkg }))
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest(global.TSDist.RootFolder));
}

function packageProvisioningBundle() {

    console.log(global.TSDist.RootFolder + "/pnp-provisioning.js");

    return browserify('./build/src/sharepoint/provisioning/provisioning.js', {
        debug: false,
        standalone: '$pnpProvisioning',
    }).ignore('*.d.ts').bundle()
        .pipe(src("pnp-provisioning.js"))
        .pipe(buffer())
        .pipe(header(banner, { pkg: global.pkg }))
        .pipe(gulp.dest(global.TSDist.RootFolder));
}

function packageProvisioningBundleUglify() {

    console.log(global.TSDist.RootFolder + "/pnp-provisioning.min.js");
    console.log(global.TSDist.RootFolder + "/pnp-provisioning.min.js.map");

    return browserify('./build/src/sharepoint/provisioning/provisioning.js', {
        debug: false,
        standalone: '$pnpProvisioning',
    }).ignore('*.d.ts').bundle()
        .pipe(src("pnp-provisioning.min.js"))
        .pipe(buffer())
        .pipe(srcmaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(header(banner, { pkg: global.pkg }))
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest(global.TSDist.RootFolder));
}

//******************************************************************************
//* PACKAGE
//******************************************************************************
gulp.task("package", ["build", "test"], function () {

    return merge([
        // build and package the definition files
        packageDefinitions(),
        // build and package the lib folder
        packageLib(),
        // bundle the core
        packageBundle(),
        packageBundleUglify(),
        // bundle provisioning
        packageProvisioningBundle(),
        packageProvisioningBundleUglify(),
    ]);
});
