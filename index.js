'use strict';
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var EtcdManager = require('./app/lib/etcd-manager.js');
var mockSocket = require('./app/cm/mock-routes.js');

require('colors');

var app = express();

var server = http.createServer(app);
app.httpServer = server;
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use('/imperial', require('./app/imperial-router'));
app.use('/account-manager', require('./app/account-manager'));
app.use('/carbono-auth', require('./app/carbono-auth'));
app.use('/code-machine', require('./code-machine'));
app.use('/ide-mission-control', require('./ide-mission-control'));
app.use('/ide-development-container-manager',
    require('./ide-development-container-manager'));
app.use('/', require('./app/swagger.js'));

var port = config.get('port');

server.listen(port, function () {
    console.log('Listen on port %d', port);
});

//var server = app.listen(config.get('port'), function () {
    var host = server.address().address;
    var port = server.address().port;
    var etcdManager = new EtcdManager();

    console.log('Carbono-Mocks listening at http://%s:%s', host, port);

    etcdManager.init();
//});


mockSocket.createRoutes(io);
