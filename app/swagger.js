'use strict';
var express = require('express');

var swaggerIt = require('./lib/swagger-it.js');

var app = express();

swaggerIt(app, 'account-manager');
swaggerIt(app, 'paas');
swaggerIt(app, 'multi-container');
swaggerIt(app, 'cm');


module.exports = app;