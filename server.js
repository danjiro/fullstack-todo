// set up =================

	var express = require('express');
	var app = express();
	var mongoose = require('mongoose');
	var database = require('./config/database');
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');
	var router = express.Router();

// configuration ==========

	// load database.js exports
	mongoose.connect(database.url);

	app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
	app.use('/bower_components', express.static(__dirname + '/bower_components')); // set bower components folder to static location
	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); 									// parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());

	var port = process.env.PORT || 8080; // set port number

// load routes ===========

	require('./app/routes')(router);
	app.use('/api', router);
	app.use('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

// listen ================

	app.listen(port);
	console.log('Magic happens on port 8080');