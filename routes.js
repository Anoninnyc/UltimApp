

var path = require('path');
var User = require('./db/models').User;
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


const pathToStaticDir = __dirname + '/client/public/index.html'
  // path.resolve(__dirname, '.', 'client/public');
const login = (req, res) => {
  console.log("req.body", req.body);

  User.findOne({
    userName: req.body.userName
  }).then(user => {
    console.log("the user exists!:", user, user.salt);
    if (!user) {
      res.send("InvalidUserName");
    } else {
      const hash = bcrypt.hashSync(req.body.pass, user.salt)
      User.findOne({
        userName: req.body.userName,
        password: hash
      }).then(user => {
        user ? res.send("foundOne") : res.send("invalidLogin");
      })
    }

  })
}

const signup = (req, res) => {

  User.findOrCreate({
    userName: req.body.userName
  }, {
    password: bcrypt.hashSync(req.body.pass, salt),
    salt,
  }, (err, newUser, created) => {
    created ? res.send("created") : res.send("Already Exists");
  });

};

const wildcard = (req, res) => {
  res.status(200).sendFile(pathToStaticDir);

}

const listen = (req, res) => {
  console.log("listening on port 3000")
}

module.exports = {
  login,
  wildcard,
  listen,
  signup,

};
