'use strict';

/**
 * This module contains routes to retrieve all files, except the HTML ones.
 *
 * @author Carbono Team
 * @module carbono-mocks/code-machine
 */
module.exports = function (app) {
    app.get('/', app.controllers.root);
};
