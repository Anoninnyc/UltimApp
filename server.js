var express = require('express');
var app = express();
var path = require('path');
var routes = require ('./routes');
var utils= require('./utils');
var http = require('http')
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
mongoose.Promise = require('bluebird');


////////
//Middleware
///////////////

app.use(express.static(__dirname + '/public', { maxAge: utils.oneDay }));


/////
//Routes
//////////

app.get("/login", routes.login)
app.get('*', routes.wildcard);

app.listen(3000, routes.listen);