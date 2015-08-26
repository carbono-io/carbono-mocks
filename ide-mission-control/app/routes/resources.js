'use strict'

var express = require('express');
var marked = require('./marked');
var clean = require('./clean');

var resources = express();

// delegates to marked route
resources.use('/marked', marked);

// delegates to clean route
resources.use('/clean', clean);

module.exports = resources;