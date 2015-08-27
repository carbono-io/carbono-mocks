'use strict';

var express = require('express');
var marked = require('./marked');
var clean = require('./clean');

var app = express();

app.use('/marked', marked);

app.use('/clean', clean);

module.exports = app;
