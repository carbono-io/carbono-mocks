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
                    },
                },
            ],
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
                    },
                },
            ],
        }
    );

    var data = [
        {collection: '/account-manager/profiles', name: '/x1',
            data: profile.toObject(),},
        {collection: '/paas/machines', name: '/TOKEN-0001',
            data: machineStatus.toObject(),},
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

    app.post('/paas/machines/', function (req, res) {
        res.json(paasResponse.toObject());
    });

    // ------------- account manager -----------------------

    var userInfo = new CJM({id: 'id1', apiVersion: '1.0.0'});
    userInfo.setData(
        {
            id: 'id2',
            items: [
                {
                    profile: {
                        code: 'code',
                    },
                },
            ],
        }
    );

    app.post('/account-manager/userInfo', function (req, res) {
        res.json(userInfo.toObject());
    });
    var projectResponse = new CJM({id: 'x1', apiVersion: '1.0.0'});
    projectResponse.setData(
        {
            id: 'y2',
            items: [
                {   
                    project: {
                        safeName: 'projeto-teste',
                        name: 'Projeto Teste',
                        description: 'Description',
                        owner: '3432h'
                    },
                },
            ],
        }
    );
    
    var errResponse400 = new CJM({id: 'x1', apiVersion: '1.0.0'});
    errResponse400.setError(
        {
            code: 400,
            message: 'Malformed request',
        }
    );
    
    var errResponse404 = new CJM({id: 'x1', apiVersion: '1.0.0'});
    errResponse404.setError(
        {
            code: 404,
            message: 'Projects not found for the user',
        }
    );
    
    var errResponse500 = new CJM({id: 'x1', apiVersion: '1.0.0'});
    errResponse500.setError(
        {
            code: 500,
            message: 'Unexpected Error',
        }
    );
    // Create project
    app.post('/account-manager/projects', function (req, res, next) {
        if (req.body.data.items[0].name === 'Project 201') {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 201;
            res.json(projectResponse.toObject());
            next();
        } else if (req.body.data.items[0].name === 'Project 400') {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            next();
        } else {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            next();
        }
    });
    
    var listProjects = new CJM({id: 'x1', apiVersion: '1.0.0'});
    listProjects.setData(
        {
            id: 'y2',
            items: [
                {   
                    project01: {
                        safeName: 'projeto-teste',
                        name: 'Projeto Teste',
                        description: 'Description',
                        owner: '3432h'
                    },
                    project02: {
                        safeName: 'projeto-teste2',
                        name: 'Projeto Teste 2',
                        description: 'Description 2',
                        owner: '5553e'
                    },
                },
            ],
        }
    );
    // List Projects
    app.get('/account-manager/projects', function (req, res, next) {
        if (req.headers.crbemail === 'email@200.com') {
            res.setHeader('content-type', 'application/json');
            res.json(listProjects.toObject());
            next();
        } else if (req.headers.crbemail === 'email@400.com') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            next();
        } else if (req.headers.crbemail === 'email@404.com') {
            res.statusCode = 404;
            res.json(errResponse404.toObject());
            next();
        } else {
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            next();
        }
    });
};

module.exports.mock = mock;
module.exports.data = data;
