myApp.controller('myCtrl', function($scope,$location, authService, $window, profileService,sendQuestion, addTags, socket) {
  console.log("running myCtrl");
  $scope.tag="";
  $scope.answering= false;
  $scope.answersShowing = {};

  const services = {
    authService,
    profileService,
    sendQuestion, 
    addTags,
  };

  $scope.questions= () => {
    return authService.questions;
  };


  $scope.getFromAuth = (key) => {
    return authService[key];
  }

  $scope.getFromSQ = (key) => {
    return sendQuestion[key];
  }

  $scope.getOpenFromSQ = (key) => {
    return sendQuestion.answering[key];
  }

   $scope.getAnswers = (key) => {
    return sendQuestion.answers[key] || [];
  }

  $scope.removeFilter= ()=>{
    console.log("attempting to remove filter");
    authService.removeFilter();
    $scope.answersShowing={};
    $(".specQuestion").css({height:"100px"});
    $(".questionsAnswer").css({display:"none"})
  }


  $scope.login = () => {
    authService.login($scope, $scope.userNameLogin, $scope.passwordLogin);
  };

  $scope.signup = () => {
    authService.signup($scope, $scope.userName, $scope.password, $scope.passConf);
  };

  $scope.logout = () => {
    authService.logout($scope);
  }

  $scope.submitProfile= () => {
    profileService.submitProfile($scope);
  };

  $scope.checkPref= (key) => {
    return authService.check(key);
  };

  $scope.getUserQuestions = () =>{
    return JSON.parse(window.localStorage.userInfo)['questions'];
  }

  $scope.getInfo =(key) => {
     return JSON.parse(window.localStorage.userInfo)[key];
  }


  $scope.redoProfile =() => {
    profileService.redoProfile();
  }

  $scope.submitTextQuestion =() => {
    sendQuestion.submitTextQuestion($scope);
  }

  $scope.addTag = (tag,scope) => {
    console.log("this is the tag",tag);
    addTags.addTag(tag,$scope);
  }

  $scope.getQuestions = ( ) => {
    sendQuestion.getQuestions($scope);
  }

  $scope.getOtherQuestions = () => {
    return authService.otherQuestions;
  }

  $scope.answerQuestion = (id,first,second) => {
    sendQuestion.answerQuestion(id,$scope);
    console.log("first","second",first,second);
  }

  $scope.submitAnswer=(id,closing) =>{
    sendQuestion.submitAnswer($scope,id,closing);
  }

  $scope.revealAnswers=(id) =>{
    sendQuestion.revealAnswers(id,$scope);
    console.log("answers showing",$scope.answersShowing);
  }

   $scope.filter = (tag) => {
     authService.filter(tag);
  };

});




myApp.controller('questionCtrl', function($scope){
  
  $scope.questionType="othersQuestions";

});