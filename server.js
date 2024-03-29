'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    logger = require('mean-logger'),
    request = require('request'),
    cheerio = require('cheerio');


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Initializing system variables 
var config = require('./config/config'),
    mongoose = require('mongoose');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

// Bootstrap passport config
require('./config/passport')(passport);

var app = express();

// Express settings
require('./config/express')(app, passport, db);

// Bootstrap routes
var routes_path = __dirname + '/app/routes';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath)(app, passport);
            }
        // We skip the app/routes/middlewares directory as it is meant to be
        // used and shared by routes as further middlewares and is not a 
        // route by itself
        } else if (stat.isDirectory() && file !== 'middlewares') {
            walk(newPath);
        }
    });
};
walk(routes_path);

// Start the app by listening on <port>
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || config.port;
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.listen(port, ip);
console.log('Express app started on port ' + port);

// Initializing logger
logger.init(app, passport, mongoose);

/*ignore jslint start*/
app.get('/quote', function(req, res){
    request('http://clearquot.es', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var $ = cheerio.load(body);
            res.send($('blockquote p').html() + '\n<small>' + $('blockquote footer cite').html() + '</small>');
        }
    });
});
/*ignore jslint end*/

// Expose app
exports = module.exports = app;