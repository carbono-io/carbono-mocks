'use strict';

module.exports = function (app) {
    app.get('/', app.controllers.root);
};
