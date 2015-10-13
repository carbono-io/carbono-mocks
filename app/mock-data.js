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
                status: 0,
            },
        ],
    }
);

var paasResponse = new CJM({id: 'xxx-yyy', apiVersion: '1.0.0'});
paasResponse.setData(
    {
        id: 'TOKEN-0001',
    }
);

var errResponse400PaaS = new CJM({id: 'xxx-yyy', apiVersion: '1.0.0'});
var err400 = {
    code: 400,
    message: 'Could not create machine',
};
errResponse400PaaS.setError(err400);

var errResponse404PaaS = new CJM({id: 'xxx-yyy', apiVersion: '1.0.0'});
var err404 = {
    code: 404,
    message: 'Could not create machine',
};
errResponse404PaaS.setError(err404);

var data = function () {

    var data = [
        {
            collection: '/account-manager/profiles', name: '/x1',
            data: profile.toObject(),
        },
        {
            collection: '/paas/machines', name: '/TOKEN-0001',
            data: machineStatus.toObject(),
        },
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

    function buildResponse(err, httpcode, errmessage, data) {
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
    app.post('/account-manager/profiles', function (req, res) {
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
                res.json(buildResponse(false, 201, '', {
                    profile: {
                        name: profile.name,
                        email: profile.email,
                        code: 'sjdh3434hdsj',
                    },
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
    app.get('/account-manager/profiles/:code', function (req, res) {
        if (req.params.code === 'user200') {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 200;
            res.json(buildResponse(false, 200, '', {
                profile: {
                    name: 'John Connor',
                    email: 'connor.john@resitance.com',
                    code: req.params.code,
                },
            }).toObject());
            res.end();
        } else if (req.params.code === 'user400') {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 400;
            res.json(buildResponse(true, 400, 'Malformed Request').toObject());
            res.end();
        } else if (req.params.code === 'user404') {
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
    app.get('/account-manager/users', function (req, res) {
        if (req.headers.crbemail === 'email@200.com') {
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(buildResponse(false, 200, '', {
                profile: {
                    name: 'John Connor',
                    email: req.headers.crbemail,
                    code: 'askjdhsakj3343',
                },
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
    app.post('/account-manager/login', function (req, res) {
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
                res.json(buildResponse(false, 200, '', {
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
                        code: 'dasdasd-443-3r4ww',
                        createdAt: new Date(2015,7,12),
                        modifiedAt: new Date(2015,8,25),
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

    var errResponse403 = new CJM({id: 'x1', apiVersion: '1.0.0'});
    errResponse403.setError(
        {
            code: 403,
            message: 'Access denied for the user',
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
    app.post('/account-manager/projects', function (req, res) {
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
                    project: {
                        safeName: 'projeto-teste',
                        name: 'Projeto Teste',
                        description: 'Description',
                        code: 'dasdasd-443-3r4ww',
                        access: 'write',
                        owner: true,
                        createdAt: new Date(2015,7,12),
                        modifiedAt: new Date(2015,8,25),
                    },
                    project2: {
                        safeName: 'projeto-teste2',
                        name: 'Projeto Teste 2',
                        description: 'Description 2',
                        code: 'dasdasd-443-3r4w2',
                        access: 'read',
                        owner: false,
                        createdAt: new Date(2015,7,12),
                        modifiedAt: new Date(2015,8,25),
                    },
                },
            ],
        }
    );
    // List Projects
    app.get('/account-manager/projects', function (req, res) {
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
                        code: 'dasdasd-443-3r4ww',
                        access: 'write',
                        owner: true,
                        createdAt: new Date(2015,7,12),
                        modifiedAt: new Date(2015,8,25),
                    },
                },
            ],
        }
    );

    // Get a Project
    app.get('/account-manager/projects/:code', function (req, res) {
        res.setHeader('content-type', 'application/json');
        if (req.params.code === 'project-200') {
            if (req.headers.crbemail === 'email@200.com') {
                res.statusCode = 200;
                res.json(getProject.toObject());
                res.end();
            } else if (req.headers.crbemail === 'email@400.com') {
                res.statusCode = 400;
                res.json(errResponse400.toObject());
                res.end();
            } else if (req.headers.crbemail === 'email@403.com') {
                res.statusCode = 403;
                res.json(errResponse403.toObject());
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
        } else if (req.params.code === 'project-400') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else if (req.params.code === 'project-403') {
            res.statusCode = 403;
            res.json(errResponse403.toObject());
            res.end();
        } else if (req.params.code === 'project-404') {
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
    app.put('/account-manager/projects/:code', function (req, res) {
        res.setHeader('content-type', 'application/json');
        if (req.params.code === 'project-201') {
            if (req.headers.crbemail === 'email@200.com') {
                var projectData = req.body.data.items[0];
                if (projectData.name && projectData.description) {
                    res.statusCode = 201;
                    res.json(buildResponse(false, 201, '', {
                        project: {
                            safeName: 'projeto-teste',
                            name: projectData.name,
                            description: projectData.description,
                            code: req.params.code,
                        },
                    }).toObject());
                    res.end();
                } else {
                    res.statusCode = 400;
                    res.json(buildResponse(true, 400,
                        'Missing param name or description').toObject());
                    res.end();
                }
            } else if (req.headers.crbemail === 'email@400.com') {
                res.statusCode = 400;
                res.json(errResponse400.toObject());
                res.end();
            } else if (req.headers.crbemail === 'email@403.com') {
                res.statusCode = 403;
                res.json(errResponse403.toObject());
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
        } else if (req.params.code === 'project-400') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else if (req.params.code === 'project-403') {
            res.statusCode = 403;
            res.json(errResponse403.toObject());
            res.end();
        } else if (req.params.code === 'project-404') {
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
    app.delete('/account-manager/projects/:code', function (req, res) {
        res.setHeader('content-type', 'application/json');
        if (req.params.code === 'project-200') {
            if (req.headers.crbemail === 'email@200.com') {
                res.statusCode = 200;
                res.json(buildResponse(false, 201, '', {
                    project: {
                        safeName: 'projeto-teste',
                        name: 'Project Name',
                        description: 'Project Description',
                        code: req.params.code,
                    },
                }).toObject());
                res.end();
            } else if (req.headers.crbemail === 'email@400.com') {
                res.statusCode = 400;
                res.json(errResponse400.toObject());
                res.end();
            } else if (req.headers.crbemail === 'email@403.com') {
                res.statusCode = 403;
                res.json(errResponse403.toObject());
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
        } else if (req.params.code === 'project-400') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else if (req.params.code === 'project-403') {
            res.statusCode = 403;
            res.json(errResponse403.toObject());
            res.end();
        } else if (req.params.code === 'project-404') {
            res.statusCode = 404;
            res.json(errResponse404.toObject());
            res.end();
        } else {
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            res.end();
        }
    });

    // ------------- Imperial Router -----------------------

    // Creates a profile
    app.post('/imperial/profiles', function (req, res) {
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
                res.json(buildResponse(false, 201, '', {
                    profile: {
                        name: profile.name,
                        email: profile.email,
                        code: 'sjdh3434hdsj',
                    },
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
    app.get('/imperial/profiles/:code', function (req, res) {
        if (req.params.code === 'user200') {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 200;
            res.json(buildResponse(false, 200, '', {
                profile: {
                    name: 'John Connor',
                    email: 'connor.john@resitance.com',
                    code: req.params.code,
                },
            }).toObject());
            res.end();
        } else if (req.params.code === 'user400') {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 400;
            res.json(buildResponse(true, 400, 'Malformed Request').toObject());
            res.end();
        } else if (req.params.code === 'user404') {
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
    app.get('/imperial/users', function (req, res) {
        if (req.headers.authorization === 'auth200') {
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(buildResponse(false, 200, '', {
                profile: {
                    name: 'John Connor',
                    email: 'connor.john@resistance.com',
                    code: 'askjdhsakj3343',
                },
            }).toObject());
            res.end();
        } else if (req.headers.authorization === 'auth400') {
            res.statusCode = 400;
            res.json(buildResponse(true, 400, 'Malformed Request').toObject());
            res.end();
        } else if (req.headers.authorization === 'auth403') {
            res.statusCode = 404;
            res.json(buildResponse(true, 403, 'Access Denied').toObject());
            res.end();
        } else if (req.headers.authorization === 'auth404') {
            res.statusCode = 404;
            res.json(buildResponse(true, 404, 'User not found').toObject());
            res.end();
        } else {
            res.statusCode = 500;
            res.json(buildResponse(true, 500, 'Unexpected Error').toObject());
            res.end();
        }
    });

    // Projects ------------------------------
    // Create project
    app.post('/imperial/projects', function (req, res) {
        if (req.headers.authorization === 'auth201') {
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
        } else {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 403;
            res.json(errResponse403.toObject());
            res.end();
        }
    });

    // List Projects
    app.get('/imperial/projects', function (req, res) {
        if (req.headers.authorization === 'auth200') {
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(listProjects.toObject());
            res.end();
        } else if (req.headers.authorization === 'auth400') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else if (req.headers.authorization === 'auth404') {
            res.statusCode = 404;
            res.json(errResponse404.toObject());
            res.end();
        } else if (req.headers.authorization === 'auth403') {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 403;
            res.json(errResponse403.toObject());
            res.end();
        } else {
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            res.end();
        }
    });

    // Get a Project
    app.get('/imperial/projects/:code', function (req, res) {
        res.setHeader('content-type', 'application/json');
        if (req.headers.authorization === 'auth200') {
            res.statusCode = 200;
            res.json(listProjects.toObject());
            res.end();
        } else if (req.headers.authorization === 'auth400') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else if (req.headers.authorization === 'auth404') {
            res.statusCode = 404;
            res.json(errResponse404.toObject());
            res.end();
        } else if (req.headers.authorization === 'auth403') {
            res.statusCode = 403;
            res.json(errResponse403.toObject());
            res.end();
        } else {
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            res.end();
        }
    });

    // Updates a Project
    app.put('/imperial/projects/:code', function (req, res) {
        res.setHeader('content-type', 'application/json');
        if (req.headers.authorization === 'auth201') {
            var projectData = req.body.data.items[0];
            res.json(buildResponse(false, 201, '', {
                project: {
                    safeName: 'projeto-teste',
                    name: projectData.name,
                    description: projectData.description,
                    code: req.params.code,
                },
            }).toObject());
            res.end();
        } else if (req.headers.authorization === 'auth400') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else if (req.headers.authorization === 'auth404') {
            res.statusCode = 404;
            res.json(errResponse404.toObject());
            res.end();
        } else if (req.headers.authorization === 'auth403') {
            res.statusCode = 403;
            res.json(errResponse403.toObject());
            res.end();
        } else {
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            res.end();
        }
    });

    // Deletes a Project
    app.delete('/imperial/projects/:code', function (req, res) {
        res.setHeader('content-type', 'application/json');
        if (req.headers.authorization === 'auth200') {
            res.statusCode = 200;
            res.json(buildResponse(false, 200, '', {
                project: {
                    safeName: 'projeto-teste',
                    name: 'Project Name',
                    description: 'Project Description',
                    code: req.params.code,
                },
            }).toObject());
            res.end();
        } else if (req.headers.authorization === 'auth400') {
            res.statusCode = 400;
            res.json(errResponse400.toObject());
            res.end();
        } else if (req.headers.authorization === 'auth404') {
            res.statusCode = 404;
            res.json(errResponse404.toObject());
            res.end();
        } else if (req.headers.authorization === 'auth403') {
            res.statusCode = 403;
            res.json(errResponse403.toObject());
            res.end();
        } else {
            res.statusCode = 500;
            res.json(errResponse500.toObject());
            res.end();
        }
    });

    app.get('/nog/machines/:token', function (req, res, next) {
        if (req.params.token === 'TOKEN-0001') {
            res.setHeader('content-type', 'application/json');
            res.json(machineStatus.toObject());
            console.log(machineStatus.toObject());
            next();
        } else if (req.params.token === 'TOKEN-0002') {
            res.statusCode = 400;
            res.json(errResponse400PaaS.toObject());
            next();
        } else if (req.params.token === 'TOKEN-0003') {
            res.statusCode = 404;
            res.json(errResponse404PaaS.toObject());
            next();
        } else {
            var e = new Error('Unexpected error');
            next(e);
        }
    });

    app.post('/nog/machines/', function (req, res, next) {
        if (req.body.data.items[0].imageName === 'crud-basic') {
            res.setHeader('content-type', 'application/json');
            console.log(paasResponse.toObject());
            res.json(paasResponse.toObject());
            next();
        } else if (req.body.data.items[0].imageName === 'crud-basic2') {
            res.statusCode = 400;
            res.json(errResponse400PaaS.toObject());
            next();
        } else if (req.body.data.items[0].imageName === 'crud-basic3') {
            res.statusCode = 404;
            res.json(errResponse404PaaS.toObject());
            next();
        } else {
            var e = new Error('Unexpected error');
            next(e);
        }
    });
};

module.exports.mock = mock;
module.exports.data = data;
