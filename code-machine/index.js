'use strict';
var path = require('path');
var consign = require('consign');
var express = require('express');

var app = express();

app.options = {
    codeDir: path.join(__dirname, 'resources/'),
    cleanPath: '/resources/clean/',
    markedPath: '/resources/marked/',
};

consign({cwd: 'code-machine/app'})
    .include('controllers')
    .include('routes')
    .into(app);

module.exports = app;
