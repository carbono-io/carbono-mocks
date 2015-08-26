'use strict';

var express = require('express');
var containerRoutes = require('./app/routes/container.js');

var app = express();

app.use('/', containerRoutes);

module.exports = app;
