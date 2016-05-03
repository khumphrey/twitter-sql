'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const swig = require('swig');
const makesRouter = require('./routes');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const pg = require('pg');
const conString = "postgres://localhost:5432/twitterdb";
const client = new pg.Client(conString);

// connect to postgres
client.connect();

// templating boilerplate setup
app.set('views', path.join(__dirname, '/views')); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({ cache: false });

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


// start the server
var server = app.listen(1337, function(){
  console.log('listening on port 1337');
});
var io = socketio.listen(server);

// modular routing that uses io inside it and passes the client down to the routes
app.use('/', makesRouter(io, client));

// the typical way to use express static middleware.
app.use(express.static(path.join(__dirname, '/public')));

//error handling
app.use(function(err,req,res,next) {
	res.status(err.status || 404);
	res.send(err.message);
});
