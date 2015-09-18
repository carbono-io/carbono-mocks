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

    app.post('/paas/machines/', function (req, res, next) {
        res.json(paasResponse.toObject());
        next();
    });

    // ------------- account manager -----------------------
    
    function buildResponse (err, httpcode, errmessage, data) {
        if (err) {
            var errResponse = new CJM({id: 'x1', apiVersion: '1.0.0'});
            errResponse.setError(
                {
                    code: httpcode,
                    message: errmessage,
                }
            );
            return errResponse;
        } else {
            var successResponse = new CJM({id: 'x1', apiVersion: '1.0.0'});
            successResponse.setData(
                {
                    id: 'y2',
                    items: [data],
                }
            );
            return successResponse;
        }
    }

    // Creates a profile
    app.post('/account-manager/profiles', function (req, res, next) {
        var profile = req.body.data.items[0];
        if (!profile.name || !profile.password || !profile.email) {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 400;
            res.json(buildResponse(true, 400, 'Malformed Request').toObject());
            res.end();
        } else {
            if (profile.name === 'John Connor 201') {
                res.setHeader('content-type', 'application/json');
                res.statusCode = 201;
                res.json(buildResponse(false, 201, "", {
                    name: profile.name,
                    email: profile.email,
                    code: 'sjdh3434hdsj',
                }).toObject());
                res.end();
            } else if (profile.name === 'John Connor 400') {
                res.setHeader('content-type', 'application/json');
                res.statusCode = 400;
                res.json(buildResponse(true, 400,
                'Malformed Request').toObject());
                res.end();
            } else {
                res.setHeader('content-type', 'application/json');
                res.statusCode = 500;
                res.json(buildResponse(true, 500,
                'Unexpected Error').toObject());
                res.end();
            }
        }
        
    });

    // Gets a profile
    app.get('/account-manager/profiles/:code', function (req, res, next) {
        if (req.params.code == 'user200') {
            res.setHeader('content-type', 'application/json');
                res.statusCode = 201;
                res.json(buildResponse(false, 201, "", {
                    name: 'John Connor',
                    email: 'connor.john@resitance.com',
                    code: req.params.code,
                    
                }).toObject());
                res.end();
        } else if (req.params.code == 'user400') {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 400;
            res.json(buildResponse(true, 400, 'Malformed Request').toObject());
            res.end();
        } else if (req.params.code == 'user404') {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 404;
            res.json(buildResponse(true, 404, 'Profile not found').toObject());
            res.end();
        } else {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 500;
            res.json(buildResponse(true, 500, 'Unexpected Error').toObject());
            res.end();
        }
    });

    // Gets a user
    app.get('/account-manager/users', function (req, res, next) {
        if (req.headers.crbemail === 'email@200.com') {
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(buildResponse(false, 200, "", {
                    name: 'John Connor',
                    email: req.headers.crbemail,
                    code: 'askjdhsakj3343',
                    
                }).toObject());
            res.end();
        } else if (req.headers.crbemail === 'email@400.com') {
            res.statusCode = 400;
            res.json(buildResponse(true, 400, 'Malformed Request').toObject());
            res.end();
        } else if (req.headers.crbemail === 'email@404.com') {
            res.statusCode = 404;
            res.json(buildResponse(true, 404, 'User not found').toObject());
            res.end();
        } else {
            res.statusCode = 500;
            res.json(buildResponse(true, 500, 'Unexpected Error').toObject());
            res.end();
        }
    });

    // Validates email and password
    app.post('/account-manager/login', function (req, res, next) {
        var profile = req.body.data.items[0];
        if (!profile.password || !profile.email) {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 400;
            res.json(buildResponse(true, 400, 
            'Malformed Request - Missing email or password').toObject());
            res.end();
        } else {
            if (profile.email === 'email@200.com') {
                res.setHeader('content-type', 'application/json');
                res.statusCode = 200;
                res.json(buildResponse(false, 200, "", {
                    name: 'John Connor',
                    email: profile.email,
                    code: 'sjdh3434hdsj',
                    
                }).toObject());
                res.end();
            } else if (profile.email === 'email@400.com') {
                res.setHeader('content-type', 'application/json');
                res.statusCode = 400;
                res.json(buildResponse(true, 400,
                'Malformed Request').toObject());
                res.end();
            } else if (profile.email === 'email@404.com') {
                res.setHeader('content-type', 'application/json');
                res.statusCode = 404;
                res.json(buildResponse(true, 404,
                'Invalid email or password').toObject());
                res.end();
            } else {
                res.statusCode = 500;
                res.json(buildResponse(true, 500, 
                'Unexpected Error').toObject());
                res.end();
            }
        }
        
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
            message: 'Project not found for the user',
        }
    );

    var errResponse500 = new CJM({id: 'x1', apiVersion: '1.0.0'});
    errResponse500.setError(
        {
            code: 500,
            message: 'Unexpected Error',
        }
    );

    // Projects ------------------------------
    // Create project
    app.post('/account-manager/projects', function (req, res, next) {
        if (req.body.data.items[0].name === 'Project 201') {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 201;
            res.json(projectResponse.toObject());
            res.end();
        } else if (req.body.data.items[0].name === 'Project 400') {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            res.end();
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
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(listProjects.toObject());
            res.end();
        } else if (req.headers.crbemail === 'email@400.com') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else if (req.headers.crbemail === 'email@404.com') {
            res.statusCode = 404;
            res.json(errResponse404.toObject());
            res.end();
        } else {
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            res.end();
        }
    });
    
    var getProject = new CJM({id: 'x1', apiVersion: '1.0.0'});
    getProject.setData(
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
    
    // Get a Project
    app.get('/account-manager/projects/:safeName', function (req, res, next) {
        res.setHeader('content-type', 'application/json');
        if (req.params.safeName == 'project-200') {
            if (req.headers.crbemail === 'email@200.com') {
                res.statusCode = 200;
                res.json(getProject.toObject());
                res.end();
            } else if (req.headers.crbemail === 'email@400.com') {
                res.statusCode = 400;
                res.json(errResponse400.toObject());
                res.end();
            } else if (req.headers.crbemail === 'email@404.com') {
                res.statusCode = 404;
                res.json(errResponse404.toObject());
                res.end();
            } else {
                res.statusCode = 500;
                res.json(errResponse500.toObject());
                res.end();
            }
        } else if (req.params.safeName == 'project-400') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else if (req.params.safeName == 'project-404') {
            res.statusCode = 404;
            res.json(errResponse404.toObject());
            res.end();
        } else {
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            res.end();
        }
    });
    
    // Updates a Project
    app.put('/account-manager/projects/:safeName', function (req, res, next) {
        res.setHeader('content-type', 'application/json');
        if (req.params.safeName == 'project-201') {
            if (req.headers.crbemail === 'email@200.com') {
                var projectData = req.body.data.items[0];
                if(projectData.name && projectData.description) {
                    res.statusCode = 201;
                    res.json(buildResponse(false, 201, "", {
                        project: {
                            safeName: 'projeto-teste',
                            name: projectData.name,
                            description: projectData.description,
                            owner: '3432h'
                        },
                    }).toObject());
                    res.end();
                } else {
                    res.statusCode = 400;
                    res.json(buildResponse(true, 400, "Missing param name or description").toObject());
                    res.end();
                }
            } else if (req.headers.crbemail === 'email@400.com') {
                res.statusCode = 400;
                res.json(errResponse400.toObject());
                res.end();
            } else if (req.headers.crbemail === 'email@404.com') {
                res.statusCode = 404;
                res.json(errResponse404.toObject());
                res.end();
            } else {
                res.statusCode = 500;
                res.json(errResponse500.toObject());
                res.end();
            }
        } else if (req.params.safeName == 'project-400') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else if (req.params.safeName == 'project-404') {
            res.statusCode = 404;
            res.json(errResponse404.toObject());
            res.end();
        } else {
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            res.end();
        }
    });
    
    // Deletes a Project
    app.delete('/account-manager/projects/:safeName', function (req, res, next) {
        res.setHeader('content-type', 'application/json');
        if (req.params.safeName == 'project-200') {
            if (req.headers.crbemail === 'email@200.com') {
                res.statusCode = 200;
                res.json(getProject.toObject());
                res.end();
            } else if (req.headers.crbemail === 'email@400.com') {
                res.statusCode = 400;
                res.json(errResponse400.toObject());
                res.end();
            } else if (req.headers.crbemail === 'email@404.com') {
                res.statusCode = 404;
                res.json(errResponse404.toObject());
                res.end();
            } else {
                res.statusCode = 500;
                res.json(errResponse500.toObject());
                res.end();
            }
        } else if (req.params.safeName == 'project-400') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else if (req.params.safeName == 'project-404') {
            res.statusCode = 404;
            res.json(errResponse404.toObject());
            res.end();
        } else {
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            res.end();
        }
    });
};

module.exports.mock = mock;
module.exports.data = data;
