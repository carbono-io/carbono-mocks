'use strict';
// Native dependencies
var exec = require('child_process').exec;
var path = require('path');

// External dependencies
var gulpif = require('gulp-if');
var uuid  = require('node-uuid');

// Internal dependencies
var markHtml = require('./plugins/mark-html');

module.exports = function (gulp, jsPath) {
    
    // Code Machine specific tasks
    var BASE_PATH  = path.join(__dirname, '../code-machine/resources');
    var CLEAN_PATH = path.join(BASE_PATH, 'clean-html/**/*');
    var DIRTY_PATH = path.join(BASE_PATH, 'marked-html');
    var OTHER_PATH = path.join(BASE_PATH, 'other');

    // Mark html resources
    gulp.task('cm:mark-resources', function () {

        // function to be called for each html tag
        function markTag(tag) {
            tag.attribs.uuid = uuid.v4();
        }

        return gulp.src(CLEAN_PATH)
            .pipe(gulpif('*.html', markHtml(markTag)))
            .pipe(gulp.dest(DIRTY_PATH));
    });

    // Copy js, css, whatever
    gulp.task('cm:other-resources', function () {

        var allFilesButHtml = [CLEAN_PATH, '!' + CLEAN_PATH + '.html'];

        return gulp.src(allFilesButHtml)
            .pipe(gulp.dest(OTHER_PATH))
    });

    // both
    gulp.task('cm:resources', ['cm:mark-resources', 'cm:other-resources'])
};