'use strict';
var path = require('path');
var express = require('express');

/**
 * This module serves all files from the codeDir directory, defined at config
 * folder.
 *
 * @author Carbono Team
 * @module carbono-mocks/code-machine
 */
module.exports = function (app) {
    var staticPath = path.join(app.options.codeDir, 'other');

    return express.static(staticPath);
};
