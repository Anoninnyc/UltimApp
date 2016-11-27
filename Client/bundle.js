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

	myApp = angular.module('myApp', ['ui.router', 'ngSanitize'])

	__webpack_require__(1);


	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);

	window.onhashchange = function() { 
	     console.log("HASHCHANGED!")
	}

	$(window).on('hashchange', function() {
	 console.log("HASHCHANGED!")
	});

/***/ },
/* 1 */
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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
	    socket,
	  };

	  Object.assign($scope,services);


	  $scope.questions= () => {
	    return authService.questions;
	  };

	  $scope.getOtherQuestions = () => {
	    return authService.otherQuestions;
	  };

	   $scope.getAnswers = (key) => {
	    return sendQuestion.answers[key] || [];
	  }

	  $scope.removeFilter= (otherQuestions)=>{
	    console.log("attempting to remove filter");
	    authService.removeFilter(otherQuestions);
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

	  
	  $scope.answerQuestion = (id,first,second) => {
	    sendQuestion.answerQuestion(id,$scope);
	    console.log("first","second",first,second);
	  }

	  $scope.submitAnswer=(id,closing) =>{
	    sendQuestion.submitAnswer($scope,id,closing);
	  }

	  $scope.revealAnswers = id =>{
	    sendQuestion.revealAnswers(id,$scope);
	    console.log("answers showing",$scope.answersShowing);
	  }

	   $scope.filter = (tag, questionType) => {
	     authService.filter(tag, questionType);
	  };

	});



	myApp.controller('questionCtrl', function($scope){
	  $scope.questionType="othersQuestions";
	});

/***/ },
/* 3 */
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


	myApp.directive('questionAnswer', function($compile) {
	console.log("RUNNING questionAnswer");
	  return {
	  	  restrict:"A",
	      templateUrl: 'source/views/questionAnswer.html'  
	      };
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);


/***/ },
/* 5 */
/***/ function(module, exports) {

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
	          localStorage.userName=userName;
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

/***/ },
/* 6 */
/***/ function(module, exports) {

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
	    console.log("status of redo", this.redo)
	    }
	  }

	});


/***/ },
/* 7 */
/***/ function(module, exports) {

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
/* 8 */
/***/ function(module, exports) {

	myApp.factory('socket', function ($rootScope) {
	  var socket = io();
	  return {
	    on: function (eventName, callback) {
	      socket.on(eventName, function () {  
	        var args = arguments;
	        $rootScope.$apply(function () {
	          callback.apply(socket, args);
	        });
	      });
	    },
	    emit: function (eventName, data, callback) {
	      socket.emit(eventName, data, function () {
	        var args = arguments;
	        $rootScope.$apply(function () {
	          if (callback) {
	            callback.apply(socket, args);
	          }
	        });
	      })
	    }
	  };
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	
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


/***/ }
/******/ ]);