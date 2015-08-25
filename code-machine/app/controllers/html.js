'use strict';
var path = require('path');

module.exports = function (app) {
    this.serveClean = function (req, res) {
        var filePath = req.path.substr(app.options.cleanPath.length);
        var absPath = path.join(app.options.codeDir, 'clean-html',  filePath);
        res.sendFile(absPath);
    };

    this.serveMarked = function (req, res) {
        var filePath = req.path.substr(app.options.markedPath.length);
        var absPath = path.join(app.options.codeDir, 'marked-html',  filePath);
        res.sendFile(absPath);
    };

    return this;
};

