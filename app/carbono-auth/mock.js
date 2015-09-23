'use strict';

var CJM = require('carbono-json-messages');
var uuid = require('node-uuid');

var data = function () {
    return [];
};

var mock = function (app) {
    app.post('/carbono-auth/bearer/validate', function (req, res, next) {
        try {
            var cjm = new CJM({id: 'x1', apiVersion: '1.0.0'});
            var reqData = req.body.data.items[0];
            var token = reqData.token;

            if (token === 'token_valido') {
                res.status(200);
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
                        message: 'Status code desconhecido',
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
};

module.exports.mock = mock;
module.exports.data = data;
