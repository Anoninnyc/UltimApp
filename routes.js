var path = require('path');
var User = require('./db/models').User;
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


const pathToStaticDir = __dirname + '/client/public/index.html';



const login = (req, res) => {
  console.log("req.body", req.body);

  User.findOne({
    userName: req.body.userName
  }).then(user => {
    //console.log("the user exists!:", user, user.salt);
    if (user === null) {
      res.send("InvalidUserName");
    } else {
      const hash = bcrypt.hashSync(req.body.pass, user.salt)
      User.findOne({
        userName: req.body.userName,
        password: hash
      }).then(user => {
        console.log("finaluser", user);
        if (user !== null) {
          req.mySession.userName = req.body.userName;
          res.send("foundOne")
        } else {
          res.send("invalidLogin");
        }
      })
    }

  })
};

const signup = (req, res) => {

  User.findOrCreate({
    userName: req.body.userName
  }, {
    password: bcrypt.hashSync(req.body.pass, salt),
    salt,
  }, (err, newUser, created) => {
    if (created) {
      req.mySession.userName = req.body.userName;

      res.send("created")
    } else {
      res.send("Already Exists");
    }

  });

};

const wildcard = (req, res) => {
  console.log("req.url", req.url, req.mySession);
  res.status(200).sendFile(pathToStaticDir);
};


const logout = (req, res) => {
  req.mySession.destroy(function(err) {
    console.log(err);
  });
  res.send("loggedout")
};



const listen = (req, res) => {
  console.log("listening on port 3000")
};

module.exports = {
  login,
  wildcard,
  listen,
  signup,
  logout,
};
