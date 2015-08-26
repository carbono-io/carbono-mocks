'use strict';
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');

var app = express();

app.httpServer = http.createServer(app);

app.use(bodyParser.json());

app.use('/code-machine', require('./code-machine'));

app.use('/ide-mission-control', require('./ide-mission-control'));

app.use('/ide-development-container-manager',
        require('./ide-development-container-manager'));

var server = app.httpServer.listen(config.get('port'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Carbono-Mocks listening at http://%s:%s', host, port);
});
