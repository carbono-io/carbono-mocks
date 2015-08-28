'use strict';

/**
 * This module contains routes to retrieve HTML files.
 *
 * @author Carbono Team
 * @module carbono-mocks/code-machine
 */
module.exports = function (app) {
    var html = app.controllers.html;

    app.get('/resources/clean/(**/)?*.html', html.serveClean);
    app.get('/resources/marked/(**/)?*.html', html.serveMarked);
};
