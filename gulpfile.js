'use strict';
var gulp = require('gulp');

var JS_PATH = ['index.js',
    '{lib,app,test}/**/*.{js,json}',
    'code-machine/index.js',
    'code-machine/app/**/*.{js,json}',
    'ide-development-container-manager/index.js',
    'ide-development-container-manager/app/**/*.{js,json}',
    'ide-mission-control/index.js',
    'ide-mission-control/app/**/*.{js,json}',
];

// Pass along gulp reference to import tasks onto your gulp object
require('./.gulp/gulp')(gulp, JS_PATH);
require('./.gulp/mygulp')(gulp, JS_PATH);
