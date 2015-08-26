'use strict'

var express = require('express');
var marked = require('./marked');
var clean = require('./clean');

var resources = express();

resources.use('/marked', marked);

resources.use('/clean', clean);

module.exports = resources;
