'use strict';
var express = require('express');

var swaggerIt = require('./lib/swagger-it.js');

var app = express();

swaggerIt(app, 'account-manager');
swaggerIt(app, 'paas');
swaggerIt(app, 'multi-container');


module.exports = app;