'use strict';
var path = require('path');
var express = require('express');

module.exports = function (app) {
    var staticPath = path.join(app.options.codeDir, 'other');

    return express.static(staticPath);
};

