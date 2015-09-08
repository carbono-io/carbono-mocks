'use strict';
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var EtcdManager = require('./app/lib/etcd-manager.js');
var exec = require('child_process').exec;

require('colors');

var app = express();

app.httpServer = http.createServer(app);

app.use(bodyParser.json());
app.use('/code-machine', require('./code-machine'));
app.use('/ide-mission-control', require('./ide-mission-control'));
app.use('/ide-development-container-manager',
    require('./ide-development-container-manager'));
app.use('/', require('./app/account-manager'));

var server = app.listen(config.get('port'), function () {
    var host = server.address().address;
    var port = server.address().port;
    var etcdManager = new EtcdManager();

    console.log('Carbono-Mocks listening at http://%s:%s', host, port);
    console.log('account-manager swagger mock running at http://%s:%s/account-manager', host, port);

    etcdManager.init();

    var child = exec('node ./app/account-manager/init.js');
    child.stdout.on('data', function(data) {
        console.log(data);
    });
    child.stderr.on('data', function(data) {
        console.log('err: ' + data);
    });
});







