'use strict';

var CJM = require('carbono-json-messages');
var uuid = require('node-uuid');
var cjm = new CJM({id: 'x1', apiVersion: '1.0.0'});

var data = function () {
    return [];
};

var mock = function (app) {
    app.post('/carbono-auth/validate', function (req, res, next) {
        try {
            var reqData = req.body.data.items[0];
            var token = reqData.token;

            if (token === 'token valido') {
                cjm.setData(
                    {
                        id: uuid.v4(),
                        items: [{
                            userInfo: {
                                code: '1234',
                                name: 'fulano',
                                email: 'email@email.com',
                            },
                        },],
                    }
                );
            } else if (token === 'token invalido') {
                cjm.setError(
                    {
                        code: 404,
                        message: 'User not found',
                    }
                );
            }
        } catch (err) {
            cjm.setError(
                {
                    code: 400,
                    message: 'Malformed Request',
                }
            );
        }
        res.json(cjm);
        res.end();
    });
};

module.exports.mock = mock;
module.exports.data = data;
