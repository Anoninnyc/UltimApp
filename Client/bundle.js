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


/***/ },
/* 1 */
/***/ function(module, exports) {

	myApp.controller('myCtrl', function($scope,$location, authService) {

	  $scope.authService=authService;
	  
	  $scope.login = () => {
	    authService.login($scope, $scope.userNameLogin, $scope.passwordLogin);

	  };

	  $scope.signup = () => {
	    authService.signup($scope, $scope.userName, $scope.password, $scope.passConf)
	    // $scope.userName = '';

	  };

	  $scope.logout = () =>{
	    console.log("controller calling logout!")
	    authService.logout($scope);
	    console.log($scope.user)
	  }

	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	myApp.service('authService', function($location) {
	  this.userName='';

	  this.signup = (scope, userName, pass, passConf) => {
	    console.log(scope, userName, pass, passConf);
	    if (pass.length < 1 || pass.length > 25) {
	      console.log("Pass length must be right")
	    } else if (pass !== passConf) {
	      console.log("They don't match!")
	    } else {
	      $.post("/signup", {
	        userName,
	        pass,
	        passConf
	      }).then((res, err) => {
	        if (res.indexOf("created")>-1) {
	          this.userName=userName;
	          $location.path("/inside");
	          scope.$apply();
	        } else {
	          console.log("Username taken!!")
	        }

	      })
	    }
	  }

	  this.login = (scope, userName, pass) => {
	    console.log (userName, pass);
	    if (userName.length < 50 && pass.length < 50) {
	      $.post("/login", {
	        userName,
	        pass
	      }).then((res, err) => {
	        if (res.indexOf("foundOne")>-1) {
	          console.log("going home");
	          this.userName=userName;
	          $location.path("/inside");
	          scope.$apply();          

	        } else {
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
	      //scope.$apply();
	    });
	  }

	  this.check= ()=>{
	    return this.userName;
	  }
	  this.change = name =>{
	    this.userName= name;
	  }

	})


/***/ },
/* 3 */
/***/ function(module, exports) {

	myApp.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

	  $urlRouterProvider.otherwise('/');

	  $stateProvider.

	  state('home', {
	    url: '/',
	    templateUrl: '/source/views/landingPage.html'
	    // ,
	    // controller: 'myCtrl'
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
	      // controller: 'myCtrl',
	      views: {
	        '': {
	          templateUrl: '/source/views/home.html'
	          // ,
	          // controller: 'myCtrl'
	        },
	        'navBar@inside': {
	          templateUrl: '/source/views/insideNav.html'
	          // ,
	          // controller: 'myCtrl'
	        },
	        'homeContent@inside': {
	          templateUrl: '/source/views/homeContent.html'
	          // ,
	          // controller: 'myCtrl'
	        }
	      }
	    }).
	    state('profile', {
	      url: '/profile',
	      controller: 'myCtrl',
	      views: {
	        '': {
	          templateUrl: '/source/views/profile.html'
	          // ,
	          // controller: 'myCtrl'
	        },
	        'navBar@profile': {
	          templateUrl: '/source/views/insideNav.html'
	          // ,
	          // controller: 'myCtrl'
	        },
	        'profContent@inside': {
	          templateUrl: '/source/views/profContent.html'
	          // ,
	          // controller: 'myCtrl'
	        }
	      }
	    })





	  $locationProvider.html5Mode({
	    enabled: true,
	    requireBase: false
	  });

	})


/***/ }
/******/ ]);