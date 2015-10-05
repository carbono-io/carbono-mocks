'use strict';

var config          = require('config');
var ServiceManager  = require('carbono-service-manager');
var Q               = require('q');
var url             = require('url');
require('colors');

var PATH_MISSION_CONTROL = '/ide-mission-control';
var PATH_DEV_CONTAINER_MANAGER = '/ide-development-container-manager';
var PATH_ACCM = '/account-manager';
var PATH_IMP = '/imperial';
var PATH_AUTH = '/carbono-auth';
var PATH_IPE = '/paas/machines';
var MC_SERVICE_KEY  = 'mc';
var DCM_SERVICE_KEY = 'dcm';
var ACCM_SERVICE_KEY = 'accm';
var IMP_SERVICE_KEY = 'imp';
var AUTH_SERVICE_KEY = 'auth';
var IPE_SERVICE_KEY = 'ipe';

/**
 * This class acts as a 'wrapper' for carbono-service-manager module, which is
 * responsible to register and find services.
 *
 * @class EtcdManager
 */
var EtcdManager = function () {
    return this;
};

/**
 * Registers a submodule as a service at etcd.
 *
 * @param {Object} Object representing a ServiceManager.
 * @param {string} service - Service identifier.
 * @param {string} path - Path to access the submodule.
 *
 * @function
 */
function register(serviceManager, service, path) {
    var promise = serviceManager.registerService(service, path);
    promise.then(
        function () {
            console.log(service + ' submodule registered');
        }, function (err) {
            console.log('[ERROR] Registering ' + service +
                ' with etcd: ' + err);
        });
    return promise;
}

/**
 * Registers all mocks at etcd.
 *
 * @return {Object} Array of promisses, with all submodules to be registered.
 * @function
 */
function registerAll() {
    if (process.env.ETCD_SERVER) {
        var serviceManager = new ServiceManager(process.env.ETCD_SERVER);

        var basePath = url.format({
            protocol: 'http',
            hostname: config.get('host'),
            port: config.get('port'),
        });

        return Q.all([
            register(serviceManager, MC_SERVICE_KEY,
                    url.resolve(basePath, PATH_MISSION_CONTROL)),
            register(serviceManager, DCM_SERVICE_KEY,
                    url.resolve(basePath, PATH_DEV_CONTAINER_MANAGER)),
            register(serviceManager, ACCM_SERVICE_KEY,
                    url.resolve(basePath, PATH_ACCM)),
            register(serviceManager, IMP_SERVICE_KEY,
                    url.resolve(basePath, PATH_IMP)),
            register(serviceManager, AUTH_SERVICE_KEY,
                    url.resolve(basePath, PATH_AUTH)),
            register(serviceManager, IPE_SERVICE_KEY,
                    url.resolve(basePath, PATH_IPE)),
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

/**
 * Initialize the communication with etcd. An environment variable named
 * ETCD_SERVER must exist, with an URL location to access etcd.
 *
 * @function
 */
EtcdManager.prototype.init = function () {
    var promises = registerAll();
    if (promises) {
        promises.then(
            function () {
                console.log('Everything was correctly registered at etcd.'
                    .green);
            }, function () {
                console.log('Error while registering submodules at etcd.'
                    .bold.red);
                console.log('They may not work correctly with other services.'
                    .red);
            }
        );
    }
};

module.exports = EtcdManager;
