'use strict';
var express = require('express');
var path = require('path');
var project = require(path.join(__dirname, '/app/routes/project'));

var app = express();

app.use('/projects', project);
module.exports = app;
