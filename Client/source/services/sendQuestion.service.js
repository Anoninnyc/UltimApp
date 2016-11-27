
myApp.service('sendQuestion', function($compile, socket, authService) {
  

  this.questionTags = [];
  this.otherQuestions = [];
  this.count = 0;
  this.answering = {};
  this.answers={};
  let that = this;

  socket.on("ioresponse", function(msg) {
    that.answers[msg.questionId].push({answerText:msg.answerText,user:msg.user});
    console.log("here are your nswers", that.answers);
  });

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
      socket.emit('addMessage', {answerText:$(`.${id}>.form-control.userAnswer`).val(), questionId:id, user:authService.userName});

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
