var gulp = require('gulp');
var NwBuilder = require('node-webkit-builder');

gulp.task('build', function () {

    var nw = new NwBuilder({
        files: ['css/**/*.css', 'js/**/*.*', 'vendor/**/*.*', 'package.json', 'index.html'],
        platforms: ['win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64']
    });

    // Build returns a promise, return it so the task isn't called in parallel
    return nw.build().catch(function (err) {
        console.log(err);
    });

});
