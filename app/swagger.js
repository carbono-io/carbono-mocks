'use strict';
var express = require('express');

var swaggerIt = require('./lib/swagger-it.js');
var authMock = require('./carbono-auth/mock');

var app = express();

swaggerIt(app, 'account-manager');
swaggerIt(app, 'paas');
swaggerIt(app, 'multi-container');
swaggerIt(app, 'cm');
swaggerIt(app, 'carbono-auth', authMock);

module.exports = app;
