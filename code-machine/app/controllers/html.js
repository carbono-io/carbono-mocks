'use strict';
var path = require('path');

/**
 * This module contains functions to serve all HTML files correctly, either
 * clean or marked files.
 *
 * @author Carbono Team
 * @module carbono-mocks/code-machine
 */
module.exports = function (app) {

    /**
     * Serves the requested HTML file as is, without the marked tags.
     *
     * @param {Object} req - Express object representing Request
     * @param {Object} res - Express object representing Response
     *
     * @function
     */
    this.serveClean = function (req, res) {
        var filePath = req.path.substr(app.options.cleanPath.length);
        var absPath = path.join(app.options.codeDir, 'clean-html',  filePath);
        res.sendFile(absPath);
    };

    /**
     * Serves the requested HTML file with marked tags.
     *
     * @param {Object} req - Express object representing Request
     * @param {Object} res - Express object representing Response
     *
     * @function
     */
    this.serveMarked = function (req, res) {
        var filePath = req.path.substr(app.options.markedPath.length);
        var absPath = path.join(app.options.codeDir, 'marked-html',  filePath);
        res.sendFile(absPath);
    };

    return this;
};
