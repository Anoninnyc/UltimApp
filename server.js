
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const routes = require ('./routes');
const utils= require('./utils');
const http = require('http')
const MongoClient = require('mongodb').MongoClient
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const sessions = require("client-sessions");

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
mongoose.connect(URL);
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