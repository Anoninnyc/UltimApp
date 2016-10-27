

var express = require('express');
var app = express();
var path = require('path');
var routes = require ('./routes');
var utils= require('./utils');
var http = require('http')
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
mongoose.Promise = require('bluebird');
var bodyParser = require('body-parser');

console.log("updated")
/////////
///DB
var URL = process.env.URL || 'mongodb://localhost:27017/mydatabase';


MongoClient.connect(URL, function(err, db) {
  if (err) {
    URL = 'mongodb://localhost:27017/mydatabase';
  } else {
    URL = process.env.URL;
  }
  db.close();
});
/////
///////////


////////
//Middleware
///////////////


app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client/Public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/////
//Routes
//////////

app.post("/login", routes.login);
app.post("/signup",routes.signup)

app.get('*', routes.wildcard);

app.listen(3000, routes.listen);