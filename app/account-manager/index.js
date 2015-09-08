'use strict';
var express = require('express');
var middleware = require('swagger-express-middleware');

var app = express();
var path = require('path');

middleware(path.resolve(__dirname,'swagger.yaml'), app, function(err, middleware) {
    // Add all the Swagger Express Middleware, or just the ones you need.
    // NOTE: Some of these accept optional options (omitted here for brevity)
    app.use(
        middleware.metadata(),
        middleware.CORS(),
        middleware.files(),
        middleware.parseRequest(),
        middleware.validateRequest(),
        middleware.mock()
    );
});

module.exports = app;