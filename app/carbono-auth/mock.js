'use strict';

var CJM     = require('carbono-json-messages');
var uuid    = require('node-uuid');
var parser  = require('body-parser');

var data = function () {
    return [];
};

var mock = function (app) {
    app.use(parser.urlencoded({
        extended: true,
    }));
    app.post('/carbono-auth/bearer/validate', function (req, res) {
        try {
            var cjm = new CJM({id: 'id', apiVersion: '1.0.0'});
            var reqData = req.body.data.items[0];
            var token = reqData.token;

            if (token === 'token_valido') {
                res.status(200);
                cjm.setData(
                    {
                        id: uuid.v4(),
                        items: [{
                            userInfo: {
                                provider: 'carbono-oauth2',
                                id: '1234',
                                displayName: 'fulano',
                                name: {
                                    familyName: 'fulano',
                                    givenName: 'fulano',
                                    middleName: '',
                                },
                                emails: [{
                                    value: 'email@email.com',
                                    type: 'personal',
                                },],
                                photos: [],
                            },
                        },],
                    }
                );
            } else if (token === 'token_invalido') {
                res.status(404);
                cjm.setError(
                    {
                        code: 404,
                        message: 'User not found',
                    }
                );
            } else {
                res.status(500);
                cjm.setError(
                    {
                        code: 500,
                        message: 'Unknown status code',
                    }
                );
            }
        } catch (err) {
            res.status(400);
            cjm.setError(
                {
                    code: 400,
                    message: 'Malformed Request',
                }
            );
        }
        res.json(cjm.toObject());
        res.end();
    });

    app.get('/carbono-auth/oauth2/authorize', function (req, res) {
        res.redirect(req.query.redirect_uri + '?code=123456');
    });

    app.post('/carbono-auth/oauth2/token', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.json({
            access_token: {value: 'valid_token',},
        });
        res.end();
    });
};

module.exports.mock = mock;
module.exports.data = data;
