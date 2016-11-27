myApp.service('authService', function($location, $window) {
  this.userName= localStorage.userName||'obama';
  this.userInfo={};

  // Below two are other users' questions
  this.otherQuestions= (!!window.localStorage.otherQuestions)?JSON.parse(window.localStorage.otherQuestions):undefined;
  this.allOtherQuestions = (!!window.localStorage.otherQuestions)?JSON.parse(window.localStorage.otherQuestions):undefined;



// Below two are the users OWN questions
  this.allQuestions = !!window.localStorage.userInfo?JSON.parse(window.localStorage.userInfo)['questions']:undefined;
  this.questions= !!window.localStorage.userInfo?JSON.parse(window.localStorage.userInfo)['questions']:undefined;

  this.filterOn= false;
  this.otherQuestionsFilterOn = false;

  this.people = [];


  this.filter = (tag, questionType) => {
    console.log("this is questionType", questionType)
     if (questionType){
      console.log("this is questions", this.otherQuestions);
      this.otherQuestions = this.otherQuestions.filter(question=> ((question.tags).indexOf(tag)>-1)) ;
      console.log("new this.questions", this.otherQuestions);
      this.otherQuestionsFilterOn=true;
    } else {
      console.log("this is tag",tag,tag.length,"this is questions", this.questions);
      this.questions = this.questions.filter(question=> ((question.tags).indexOf(tag)>-1)) ;
      console.log("new this.questions", this.questions);
      this.filterOn=true;
    }
  };

    this.removeFilter= (otherQuestions) => {
      if (otherQuestions){
       this.otherQuestions = this.allOtherQuestions;
       console.log("QUESTIONS!", this.otherQuestions, this.allOtherQuestions);
       this.otherQuestionsFilterOn = false;
      } else {
        this.questions = this.allQuestions;
        console.log("QUESTIONS!", this.allQuestions, this.questions);
        this.filterOn = false;
      }
  };

  this.signup = (scope, userName, pass, passConf) => {
    if (pass.length < 1 || pass.length > 25) {
      console.log("Pass length must be right");
    } else if (pass !== passConf) {
      console.log("They don't match!")
      $("#mismatchSignUp").css("display","inline");
      $("#userNameTaken").css("display","none");
    } else {
      $.post("/signup", {
        userName,
        pass,
        passConf
      }).then((res, err) => {
        if (typeof res ==="object") {
          console.log("this is res",res)
          this.userName=userName;
          localStorage.userInfo=JSON.stringify(res);
          localStorage.otherQuestions=JSON.stringify(res.otherQuestions);
          this.otherQuestions = res.otherQuestions;
          this.userInfo = res;
          scope.questions = res.questions;
          this.questions=res.questions;
          $location.path("/inside");
          scope.$apply();
        } else {
          console.log("Username taken!!")
          $("#userNameTaken").css("display","inline");
          $("#mismatchSignUp").css("display","none");
        }

      })
    }
  }

  this.login = (scope, userName, pass) => {
    if (userName.length < 50 && pass.length < 50) {
      $.post("/login", {
        userName,
        pass
      }).then((res, err) => {
        console.log(typeof res, res);
        if (typeof res==="object") {
          console.log("going home", res);
          localStorage.userInfo=JSON.stringify(res);
          localStorage.userName = res.userName;
          localStorage.otherQuestions=JSON.stringify(res.otherQuestions);
          this.otherQuestions=res.otherQuestions;
          this.userInfo = res;
          scope.questions = res.questions;
          this.questions=res.questions;
          this.userName = res.userName;
          console.log("userInfo in auth service", this.userInfo);
          $location.path("/inside");
          scope.$apply();          
        } else {
          $("#badLogin").css("display","inline");
          console.log("Bad login!!")
        }

      })
    }
  }

  this.logout = scope => {
    $.post("/logout", {
      "logout": "now"
    }).then((res, err) => {
      console.log("calledback!", res, err)
      $location.path("/");
      localStorage.userInfo = "";
      localStorage.otherQuestions = "";
      localStorage.user = "";
      localStorage.userName = "";
      scope.$apply();
      //$window.localStorage.setItem("userInfo","")
    });
  }

  this.check = (val)=>{
    return JSON.parse($window.localStorage.getItem("userInfo"))[val]
  };

})