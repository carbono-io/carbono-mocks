'use strict';
var path = require('path');
var mockData = require('../mock-data.js');

var swagger = require('swagger-express-middleware');
var Middleware = swagger.Middleware;
var MemoryDataStore = swagger.MemoryDataStore;
var Resource = swagger.Resource;

var swaggerIt = function (app, module) {

    var middleware = new Middleware(app);

    middleware.init(path.resolve(__dirname, "../" + module + '/swagger.yaml'), function () {
            // Add all the Swagger Express Middleware, or just the ones you need.
            // NOTE: Some of these accept optional options (omitted here for brevity)
            //
            var myDB = new MemoryDataStore();
            myDB.save(Resource.parse(mockData));

            app.patch('/paas/machines/:token', function (req, res, next) {
                    console.log(req);
                    res.json({status: 'OK'});
                    next();
                }
            );

            app.use(
                middleware.metadata(),
                middleware.CORS(),
                middleware.files(),
                middleware.parseRequest(),
                middleware.validateRequest(),
                middleware.mock(myDB)
            );

        }
    );
    console.log(module + ' swagger mock running!!!');
};

module.exports = swaggerIt;