'use strict';

var CJM = require('carbono-json-messages');
var profile = new CJM({id: 'x1', apiVersion: '1.0.0'});

var data = function () {

    profile.setData(
        {
            id: 'y2',
            items: [
                {
                    profile: {
                        code: 'simu-code',
                        name: 'ariosvaldo',
                        email: 'ari@valdo.com.br',
                        password: 'foo',
                    }
                }
            ]
        }
    );

    var machineStatus = new CJM({id: 'xxx-yyy', apiVersion: '1.0.0'});

    machineStatus.setData(
        {
            id: 'token1',
            items: [
                {
                    machineStatus: {
                        status: 'OK',
                    }
                }
            ]
        }
    );


    var data = [
        {collection: '/account-manager/profiles', name: '/x1', data: profile.toObject()},
        {collection: '/paas/machines', name: '/TOKEN-0001', data: machineStatus.toObject()},
        {collection: '/nog/machines', name: '/', data: ''},
    ];
    return data;
};

var mock = function (app) {
    var paasResponse = new CJM({id: 'xxx-yyy', apiVersion: '1.0.0'});
    paasResponse.setData(
        {
            id: 'TOKEN-0001',
        }
    );
    app.post('/paas/machines/', function (req, res, next) {
        res.json(paasResponse.toObject());
        next();
    });
};

module.exports.mock = mock;
module.exports.data = data;