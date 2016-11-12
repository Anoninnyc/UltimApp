myApp.service('authService', function($location, $window) {
  this.userName='';
  this.userInfo={};
  // this.otherQuestions= !!window.localStorage.userInfo?JSON.parse(window.localStorage.userInfo)['questions']:undefined;
  this.allQuestions = !!window.localStorage.userInfo?JSON.parse(window.localStorage.userInfo)['questions']:undefined;
  this.questions= !!window.localStorage.userInfo?JSON.parse(window.localStorage.userInfo)['questions']:undefined;
  this.filterOn= false;


  this.filter= (tag) => {
    console.log("this is tag",tag,tag.length,"this is questions", this.questions);
    this.questions = this.questions.filter(question=> ((question.tags).indexOf(tag)>-1)) ;
    console.log("new this.questions", this.questions);
    this.filterOn=true;
  }

    this.removeFilter= () => {
    this.questions = this.allQuestions;
    console.log("QUESTIONS!", this.allQuestions, this.questions);
    this.filterOn = false;
  }

  this.signup = (scope, userName, pass, passConf) => {
    console.log(scope, userName, pass, passConf);
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
          this.userName=userName;
          localStorage.userInfo=JSON.stringify(res);
          localStorage.user = res.userName;
          localStorage.otherQuestions=JSON.stringify(res.otherQuestions);
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
          localStorage.user = res.userName;
          localStorage.otherQuestions=JSON.stringify(res.otherQuestions);
          this.userInfo = res;
          scope.questions = res.questions;
          this.questions=res.questions;
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
      scope.user="";
      $location.path("/");
      localStorage.userInfo = "";
      localStorage.otherQuestions = "";
      localStorage.user = "";
      scope.$apply();
      //$window.localStorage.setItem("userInfo","")
    });
  }

  this.check = (val)=>{
    return JSON.parse($window.localStorage.getItem("userInfo"))[val]
  };

})

myApp.service('profileService', function(authService, $window) {

  this.redo = false; 

  this.submitProfile= scope =>{
  const dropDowns = [$("#firstDD :selected").text(),$("#secondDD :selected").text(),$("#thirdDD :selected").text(),$("#fourthDD :selected").text()];
  const handles = [$("#custom-handle").text(),$("#custom-handle2").text(),$("#custom-handle3").text(),$("#custom-handle4").text()];
  const radio1 = $("#radio01")[0].checked;
  const radio2= $("#radio02")[0].checked;
  const oneChecked = radio1||radio2;
  const AllDroppedDown =  dropDowns.indexOf("Select an area")<0;
  const allHandled = handles.indexOf("0")<0;
  console.log(dropDowns, handles, radio1,radio2, oneChecked, AllDroppedDown, allHandled);
  $.post('/profile', {preferences:{dropDowns, handles, radio1,radio2, oneChecked, AllDroppedDown, allHandled}, userName:authService.check("userName")}).then((res,err)=>{
    console.log("this is res", JSON.stringify(res),err)
    if (err!=="Success"){
      res.questions = JSON.parse(localStorage.userInfo).questions;
      localStorage.userInfo=JSON.stringify(res);
      scope.$apply();
    }
  });
}

  this.redoProfile = () =>{

    console.log("runningREDO!", authService.check("preferences"));
    if (authService.check("preferences")){
    this.redo = !this.redo; 
    }
  }

});


myApp.service('sendQuestion', function($compile) {
  this.questionTags = [];
  this.otherQuestions = [];
  this.count = 0;
  this.answering = {};
  this.answers={};

  this.submitTextQuestion = (scope) =>{
    const question= $("#comment").val();

    if (!question.length){
      console.log("enter a question");
    } else {
      $.post("/addQuestion",{question:question, type:"text", tags:this.questionTags}, (res,err) =>{
        console.log("RESERR**********",res,err,"**************");
        this.questionTags = [];
        $(".tagName").remove();
        $("#comment").val("");
        $("#tagInput").val("");
      })
    }

    console.log("running submit question");
   
  }



  this.getQuestions = scope => {
    $.get("/otherUserQuestions").then((res, err)=>{
      console.log(res,err);
      this.otherQuestions = res;
      scope.$apply();
      localStorage.otherQuestions = JSON.stringify(res);

    })
  };

  this.answerQuestion = (id,scope) => {
    console.log(!!this.count)
    this.answering[id]=true;
    if (!!this.count) {
      return;
    }
    this.count++;
    this.id=id
  };


    this.submitAnswer = (scope,id,closing) => {
    this.answering[id]=false;
    if (!!closing) {
      console.log("JUST KILLING!",id);
      this.id=null;
      this.count=0;
      return;
    }
      console.log("THIS IS wht will be sent",id,$(`.${id}>.form-control.userAnswer`).val());
      $.post("/submitAnswer",{id:this.id,answer:$(`.${id}>.form-control.userAnswer`).val()}).then((res,err)=>{
      console.log("this is res/err", res, err);
      console.log($(`.userAnsw.${this.id}`))
      $(`.userAnsw.${this.id}`).remove();
      this.id=null;
      this.count=0;
    })
  }




  this.revealAnswers = (id,scope) => {

    $.post('/getAnswers', {id:id}).then((res,err)=>{
      console.log("RESERR",res,err);
      scope.answersShowing[id]=!scope.answersShowing[id];
      this.answers[id]=res;
      scope.$apply();

      console.log("whats in the oibj",scope.answersShowing);

      if (!scope.answersShowing[id]){
        $(`.specQuestion.${id}`).animate({height:"120px"},1500,function(){
            $(`.questionsAnswer.${id}`).css({display:"none"});
          })
      
      } else {
        $(`.specQuestion.${id}`).animate({height:"500px"},1500)
        $(`.questionsAnswer.${id}`).css({display:"inline"})
      }

    })
  };

});





myApp.service('addTags', function(sendQuestion) {

  const tagOptions = ["Option1", "Option2", "Option3", "Option4"];
  

  this.addTag = (scope) => {
    console.log("this is tag", $("#tags").val());
    const tag =   $("#tags").val();
    const tagLocation= tagOptions.indexOf(tag);

    if (tagLocation<0) {
      console.log("Not a valid tag")
      return;
    } else {
    $("#askedQuestionTags").append(`<div class="tagName">${tag}</div>`)
     sendQuestion.questionTags.push(tag);
     tagOptions.splice(tagLocation,1);
     console.log("tagsLeft", tagOptions)
    }
  }


});