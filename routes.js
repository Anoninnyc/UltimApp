var path = require('path');
var User = require('./db/models').User;
const Question = require('./db/models').Question;
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


const pathToStaticDir = __dirname + '/client/public/index.html';



const login = (req, res) => {
  console.log("req.body", req.body);

  User.findOne({
    userName: req.body.userName
  }).then(user => {
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
          req.mySession.id = user._id;

          Question.find({
            type: "text"
          }).then(questions => {

            let ownQuestions = questions.filter(question => (question.user === req.body.userName));
            let otherQuestions = questions.filter(question => (question.user !== req.body.userName))

            res.send({
              "userName": user.userName,
              "preferences": user.preferences,
              questions: ownQuestions,
              otherQuestions
            });

          })
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
      console.log("NUC!!!", newUser, created)
      req.mySession.userName = req.body.userName;
      req.mySession.id = newUser._id;
      res.send({
        "userName": req.body.userName
      });
    } else {
      res.send("Already Exists");
    }

  });

};

const wildcard = (req, res) => {
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

const userProfile = (req, res) => {

  var updateData = {
    preferences: req.body.preferences
  };

  User.update({
    userName: req.body.userName
  }, updateData, function(err, affected) {
    console.log('affected rows %d', affected);
    User.findOne({
      userName: req.body.userName
    }).then(user => {
      console.log("this is the user", user);
      res.send({
        "userName": user.userName,
        "preferences": user.preferences
      });
    })
  });
}


const addQuestion = (req, res) => {
  console.log("req.body.question", req.body);

  if (req.body.type === "text") {

    const question = new Question({
      user: req.mySession.userName,
      tags: req.body.tags,
      type: "text",
      text: req.body.question,
      video: "null"
    });

    question.save((err, entry) => {
      console.log("err,entry", err, entry);
      res.send("Entered!");
    });
  }

}

const addVideo = (req, res) => {
  console.log("req.body.", req.body);
}

const othersQuestions = (req, res) => {
  const username = req.mySession.userName;
  Question.find({
    user: {
      $ne: username
    }
  }).then(questions => {
    console.log("These are the questions!", questions);
    res.send(questions);
  })

}

const submitAnswer = (req, res) => {
  console.log("req.body FOR SUBMIT ANSWER!!!!", req.body);
  Question.findByIdAndUpdate(req.body.id, {
      $push: {
        "answers": {
          answerText: req.body.answer,
          user: req.mySession.userName
        }
      }
    }, {
      safe: true,
      upsert: true,
      new: true
    },
    (response, err) => {
      console.log("was it found???", response, err);
      res.send(err ? "error" : "updated");
    })

};

const getAnswers = (req, res) => {
   Question.findOne({_id:req.body.id}).then(question=>{
    console.log("answers to be sent", question.answers)
    res.send(question.answers);
   })
}

module.exports = {
  login,
  wildcard,
  listen,
  signup,
  logout,
  userProfile,
  addQuestion,
  addVideo,
  othersQuestions,
  submitAnswer,
  getAnswers,
};
