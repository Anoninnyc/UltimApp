myApp.controller('myCtrl', function($scope,$location, authService, $window, profileService,sendQuestion, addTags) {
  
  $scope.tag="";
  $scope.authService = authService;
  $scope.profileService = profileService;
  $scope.sendQuestion = sendQuestion;
  $scope.addTags = addTags
  $scope.answering= false;
  $scope.answersShowing = {};

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
    $scope.authService.login($scope, $scope.userNameLogin, $scope.passwordLogin);
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

  $scope.checkPref=(key) => {
    return authService.check(key);
  };

  $scope.getUserQuestions = () =>{
    //console.log(JSON.parse(window.localStorage.userInfo)['questions']);
    return JSON.parse(window.localStorage.userInfo)['questions']
  }

  $scope.getInfo =(key) =>{
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
    return JSON.parse(window.localStorage.otherQuestions);
  }

  $scope.answerQuestion = (id,first,second) => {
    sendQuestion.answerQuestion(id,$scope);
    console.log("first","second",first,second);
  }

  $scope.clickMe=()=>{
    console.log("you clicked me!")
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





