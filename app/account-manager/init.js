'use strict';
var request = require('request');
var CJM = require('carbono-json-messages');
var cjm = new CJM({id: 'x1', apiVersion: '1.0.0'});

cjm.setData(
    {
        id: 'y2',
        items: [
            {
                name: 'giulian',
                email: 'foo',
                password: 'foo'
            }
        ]
    }
);

var url = "http://localhost:3000/account-manager/account";

var load = {
    url: url,
    json: cjm.toObject()
};

var _cb = function (err, httpResponse, body) {
    try {
        console.log('Response: ' + httpResponse.statusCode);
        console.log("body: " + body);
        console.log("account-manager initialized");
    } catch (err) {
        this.err = err;
        console.log(err);
    }
};
request.post(load, _cb);
