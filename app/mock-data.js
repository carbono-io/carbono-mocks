'use strict';

var CJM = require('carbono-json-messages');
var profile = new CJM({id: 'x1', apiVersion: '1.0.0'});

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
    {collection: '/paas/machines', name: '/token1', data: machineStatus.toObject()},
    {collection: '/nog/machines', name: '/', data: ''},
];


module.exports = data;