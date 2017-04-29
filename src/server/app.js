'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bearerToken = require('express-bearer-token');
var four0four = require('./utils/404')();

var port = process.env.PORT || 8001;
var environment = process.env.NODE_ENV;

var app = express();

// For getting JWT from headers in requests
app.use(bearerToken());

// Static favicon
app.use(favicon(__dirname + '/favicon.ico'));
// For JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));


// If no endpoint has been called, return 404
express.Router().get('/*', four0four.notFoundMiddleware);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Invalid calls to assets should return the custom error object to mitigate
        // against XSS reflected attacks
        app.use('/js/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        app.use('/images/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        app.use('/styles/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
});
