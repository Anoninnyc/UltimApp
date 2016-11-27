const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const utils = require('./utils');
const MongoClient = require('mongodb').MongoClient
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const sessions = require("client-sessions");
const server= app.listen(3000, routes.listen);

const io = require('socket.io').listen(server)


io.on('connection', function(socket){
  console.log('Socket connected!');

  socket.on('addMessage', function(msg){
    console.log("***************You're trying to add a message!**********");
    io.emit('ioresponse', msg);
  });

});

//////
///DB
///////
let URL = process.env.URL || 'mongodb://localhost:27017/mydatabase';


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

const auth = (req, res, next) => {
  if (!req.mySession.userName && req.url !== "/login" && req.url !== "/signup") {
    res.redirect('/');
  } else {
    next();
  }
};


app.use(sessions(utils.sessionSpecs));

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client/Public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/////
//API Routes
//////////

app.post("/login", routes.login);
app.post("/signup", routes.signup);
app.get('/', routes.wildcard);

app.post('/logout', routes.logout);
app.post('/profile', routes.userProfile);
app.post('/addQuestion', routes.addQuestion);
app.post('/postVideo', routes.addVideo);
app.get('/otherUserQuestions',routes.othersQuestions);
app.post('/submitAnswer',routes.submitAnswer);
app.post('/getAnswers',routes.getAnswers);


app.get('*', auth, routes.wildcard);
//app.listen(3000, routes.listen);
