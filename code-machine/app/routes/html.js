'use strict';

module.exports = function (app) {
    var html = app.controllers.html;

    app.get('/resources/clean/(**/)?*.html', html.serveClean);
    app.get('/resources/marked/(**/)?*.html', html.serveMarked);
};

