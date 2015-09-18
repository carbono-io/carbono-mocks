/**
 * This module defines some mock data to be exposed
 */

'use strict';
var request = require('request');
var CJM = require('carbono-json-messages');

/* ----- Account MOCK data ----- */
var cjmAccount = new CJM({id: 'x1', apiVersion: '1.0.0'});

cjmAccount.setData(
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

var urlAccount = "http://localhost:3000/account-manager/account";

var load = {
    url: urlAccount,
    json: cjmAccount.toObject()
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

/* ----- Project MOCK data ----- */
var cjmProject = new CJM({id: 'x1', apiVersion: '1.0.0'});

cjmProject.setData(
    {
        owner: 'asdarferson'
    }
);

var urlProject = "http://localhost:3000/account-manager/projects";

var loadProject = {
    url: urlProject,
    json: cjmProject.toObject()
};

var _cbProject = function (err, httpResponse, body) {
    try {
        console.log('Response: ' + httpResponse.statusCode);
        console.log("body: " + body);
        console.log("project-manager initialized");
    } catch (err) {
        this.err = err;
        console.log(err);
    }
};
request.post(loadProject, _cbProject);
