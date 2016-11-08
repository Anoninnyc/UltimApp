/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	myApp = angular.module('myApp', ['ui.router', 'ngSanitize']);

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);



/***/ },
/* 1 */
/***/ function(module, exports) {

	myApp.controller('myCtrl', function($scope,$location, authService, $window, profileService,sendQuestion, addTags) {
	  $scope.tag="";
	  $scope.authService = authService;
	  $scope.profileService = profileService;
	  $scope.sendQuestion = sendQuestion;
	  $scope.addTags = addTags
	  $scope.answering= false;
	  $scope.answersShowing = {};
	  $scope.questions= () => {
	    console.log("authService.questions", authService.questions);
	    return authService.questions ||JSON.parse(window.localStorage.userInfo)['questions'];
	  };




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
	    $scope.answering=true;
	    console.log("first","second",first,second);
	  }

	  $scope.clickMe=()=>{
	    console.log("you clicked me!")
	  }

	  $scope.submitAnswer=(arg) =>{
	    sendQuestion.submitAnswer($scope,arg);
	    $scope.answering=false;

	  }

	  $scope.revealAnswers=(id) =>{
	    sendQuestion.revealAnswers(id,$scope);
	    $scope.answersShowing[id]=!$scope.answersShowing[id];
	    console.log("answers showing",$scope.answersShowing);
	  }

	   $scope.filter = (tag) => {
	     authService.filter(tag);
	  };

	});





/***/ },
/* 2 */
/***/ function(module, exports) {

	myApp.directive('userQuestion', function($compile) {
	console.log("RUNNING userQuestion")
	  return {
	  	  restrict:"A",
	      templateUrl: 'source/views/singleQuestion.html'  
	      };
	});



	myApp.directive('userAnswer', function($compile) {
	console.log("RUNNING userQuestion")
	  return {
	  	  restrict:"A",
	      templateUrl: 'source/views/singleAnswer.html'  
	      };
	});


/***/ },
/* 3 */
/***/ function(module, exports) {

	myApp.service('authService', function($location, $window) {
	  this.userName='';
	  this.userInfo={};

	  this.filter= (tag) => {
	    console.log("this is tag",tag,tag.length,"this is questions", this.questions);

	    this.questions = this.questions.filter(question=> ((question.tags).indexOf(tag)>-1)) ;

	    console.log("new this.questions", this.questions);

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
	          localStorage.userInfo=JSON.stringify(res);;
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
	  this.answering=false;


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
	    $.get("otherUserQuestions").then((res, err)=>{
	      console.log(res,err);
	      this.otherQuestions = res;
	      scope.$apply();
	      localStorage.otherQuestions = JSON.stringify(res);

	    })
	  };

	  this.answerQuestion = (id,scope) => {
	    console.log(!!this.count)
	    if (!!this.count) {
	      return;
	    }
	    const template =`<div user-answer class="userAnsw ${id}"/>`;
	    const linkFn=$compile(template);
	    const content = linkFn(scope);
	    console.log("you're trying to answerQuestion with this ID", id);
	    $(`.${id}`).after(content);
	    this.count++;
	    this.answering=true;
	    this.id=id

	  };



	  this.revealAnswers = (id,scope) =>{
	    if (!scope.answersShowing[id]){
	    $(`.specQuestion.${id}`).animate({height:"700px"},1500)
	  } else {
	    $(`.specQuestion.${id}`).animate({height:"200px"},1500)
	  }
	    
	  };



	  this.submitAnswer = (scope,arg) => {

	    if (arg){
	      console.log("JUST KILLING!")
	      $(`.userAnsw.${this.id}`).remove();
	      this.id=null;
	      this.count=0;
	      return;
	    }



	    console.log(this.id);
	    $.post("/submitAnswer",{id:this.id,answer:$(".form-control.userAnswer").val()}).then((res,err)=>{
	      console.log("this is res/err", res, err);
	      console.log($(`.userAnsw.${this.id}`))
	      $(`.userAnsw.${this.id}`).remove();
	      this.id=null;
	      this.count=0;
	    })
	  }
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	myApp.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

	  $urlRouterProvider.otherwise('/');

	  $stateProvider.

	  state('home', {
	    url: '/',
	    templateUrl: '/source/views/landingPage.html'
	  }).
	  state('login', {
	    url: '/login',
	    templateUrl: '/source/views/login.html',
	    controller: 'myCtrl'
	  }).
	  state('signup', {
	    url: '/signup',
	    templateUrl: '/source/views/signup.html',
	    controller: 'myCtrl'
	  }).
	  state('inside', {
	      url: '/inside',
	      views: {
	        '': {
	          templateUrl: '/source/views/home.html'
	        },
	        'navBar@inside': {
	          templateUrl: '/source/views/insideNav.html'
	        },
	        'homeContent@inside': {
	          templateUrl: '/source/views/homeContent.html'
	        }
	      }
	    }).
	    state('profile', {
	      url: '/profile',
	      controller: 'myCtrl',
	      views: {
	        '': {
	          templateUrl: '/source/views/profile.html'
	        },
	        'navBar@profile': {
	          templateUrl: '/source/views/insideNav.html'
	        },
	        'profContent@': {
	          templateUrl: '/source/views/profContent.html'
	        },
	        'carousel@profile':{
	          templateUrl: '/source/views/carousel.html'
	        }
	      }
	    }).
	    state('broadcast', {
	      url: '/broadcast',
	      controller: 'myCtrl',
	      views: {
	        '': {
	          templateUrl: '/source/views/broadcast.html'
	        },
	        'navBar@broadcast': {
	          templateUrl: '/source/views/insideNav.html'
	        },
	        'question@broadcast' : {
	          templateUrl: '/source/views/question.html'
	        }
	      }
	    }).
	    state('textQuestion',{
	      url:'/textQuestion',
	      controller: 'myCtrl',
	      views:{
	        "":{
	          templateUrl: '/source/views/textQuestion.html'
	        },
	        'navBar@textQuestion': {
	          templateUrl: '/source/views/insideNav.html'
	        },
	      }
	    }).
	    state('videoQuestion',{
	      url:'/videoQuestion',
	      controller: 'myCtrl',
	      views:{
	        "":{
	          templateUrl: '/source/views/videoQuestion.html'
	        },
	        'navBar@videoQuestion': {
	          templateUrl: '/source/views/insideNav.html'
	        },
	      }
	    }).
	    state('listOfQuestions',{
	      url:"/questions",
	      controller: 'myCtrl',
	      views: {
	        "":{
	          templateUrl: '/source/views/userQuestions.html'
	        },
	        'navBar@listOfQuestions': {
	          templateUrl: '/source/views/insideNav.html'
	        },
	      }
	    })



	  $locationProvider.html5Mode({
	    enabled: true,
	    requireBase: false
	  });

	})


/***/ }
/******/ ]);