// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;


var DomFs = require('dom-fs');

// Consts
var PLUGIN_NAME = 'gulp-prefixer';


// fs at root path
var domFs = new DomFs('/');

// Plugin level function(dealing with files)
function gulpHtmlMarker(markerFn) {

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }
    if (file.isBuffer()) {

      // get the domFile
      var domFile = domFs.getFile(file.path);

      // stringify domFile adding uuid to the tags
      var domFileContents = domFile.stringify(function (element) {
        if (element.type === 'tag') {
          markerFn(element);
        }
      });

      // set contents onto the vinyl file
      file.contents = new Buffer(domFileContents);
    }
    if (file.isStream()) {
      throw new Error('Streams not supported for mark-html plugin')
      file.contents = file.contents.pipe(prefixStream(prefixText));
    }


    cb(null, file);

  });

}

// Exporting the plugin main function
module.exports = gulpHtmlMarker;