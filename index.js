'use strict';
var http = require('http');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var ServiceManager = require('carbono-service-manager');
var Q = require('q');
require('colors');

var idCodeMachine = '/code-machine';
var idMissionControl = '/ide-mission-control';
var idDevContainerManager = '/ide-development-container-manager';

/**
 * Registers a submodule as a service at etcd.
 *
 * @param {string} service - Service identifier.
 * @param {string} path - Path to access the submodule.
 *
 * @function
 */
function registerService(service, path) {
    var registerPromise = global.serviceManager.registerService(service, path);
    registerPromise
        .then(function () {
            console.log(service + ' submodule registered');
        }, function (err) {
            console.log('[ERROR] Registering ' + service +
                ' with etcd: ' + err);
        });
    return registerPromise;
}

/**
 * Registers all mocks at etcd.
 *
 * @return {Object} Array of promisses, with all submodules to be registered.
 * @function
 */
function etcdRegister() {
    if (process.env.ETCD_SERVER) {
        var basePath = url.format({
            hostname: config.get('host'),
            port: config.get('port'),
        });

        global.serviceManager = new ServiceManager(process.env.ETCD_SERVER);

        return Q.all([
            registerService('cm', url.resolve(basePath, idCodeMachine)),
            registerService('mc', url.resolve(basePath, idMissionControl)),
            registerService('dcm',
                    url.resolve(basePath, idDevContainerManager)),
        ]);

    } else {
        console.log(
            'The environment variable ETCD_SERVER is not defined!'.bold.red);
        console.log('Please, define it before continuing, otherwise the'.red);
        console.log('integration will not work!'.red);
        console.log();
        return null;
    }
}

var app = express();

app.httpServer = http.createServer(app);

app.use(bodyParser.json());
app.use(idCodeMachine, require('./code-machine'));
app.use(idMissionControl, require('./ide-mission-control'));
app.use(idDevContainerManager, require('./ide-development-container-manager'));

var server = app.httpServer.listen(config.get('port'), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Carbono-Mocks listening at http://%s:%s', host, port);

    var registers = etcdRegister();
    if (registers) {
        registers.then(
            function () {
                console.log('Everything was correctly registered at etcd.');
            }, function () {
                console.log('Error while registering submodules at etcd.'
                    .bold.red);
                console.log('They may not work correctly with other services.'
                    .red);
            }
        );
    }
});
