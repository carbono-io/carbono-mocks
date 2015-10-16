'use strict';

var config = require('config');
var etcd   = require('carbono-service-manager');
var Q      = require('q');
var url    = require('url');
require('colors');

var PATH_MC = '/ide-mission-control';
var PATH_DCM = '/ide-development-container-manager';
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
 * Registers all mocks at etcd.
 *
 * @return {Object} Array of promisses, with all submodules to be registered.
 * @function
 */
function registerAll() {

    var host = config.get('host');
    var port = config.get('port');

//key, alias, host, port, _namespac
    etcd.register(MC_SERVICE_KEY, 'Mission-Control', host, port, PATH_MC);
    etcd.register(DCM_SERVICE_KEY, 'Dev-Container-M', host, port, PATH_DCM);
    etcd.register(ACCM_SERVICE_KEY, 'Account-M', host, port, PATH_ACCM);
    etcd.register(IMP_SERVICE_KEY, 'Bromelia Imperial', host, port, PATH_IMP);
    etcd.register(AUTH_SERVICE_KEY, 'OAuth2', host, port, PATH_AUTH);
    etcd.register(IPE_SERVICE_KEY, 'Mogno Ipê', host, port, PATH_IPE);

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
