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

	myApp = angular.module('myApp', ['ngRoute', 'ngSanitize']);

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	myApp.controller('myCtrl', function($scope, authService) {
		$scope.login = ()=>{
			authService.login($scope,$scope.userName,$scope.password,$scope.passConf)

	  $scope.userName='';
	  $scope.pass='';
	  $scope.passConf='';

		};



	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	myApp.service('authService', function($http) {

	  this.login = (scope, userName, pass, passConf) => {
	      //   if (pass.length<7 ||pass.length>25 ){
	      //     console.log("Pass length must be right")
	      // } else if (pass!==passConf){
	      //   console.log("They don't match!")
	      // } else {
	        //$http.post("/login", {"test":"again"});
	        //$.post("login" , {"test":"again"});
	        // $http.post("login", {"test":"again"});
	        $.post("/login" , {userName, pass, passConf})
	      //}
	  }




	})

/***/ },
/* 3 */
/***/ function(module, exports) {

	myApp.config(function($routeProvider, $locationProvider) {
	  $routeProvider.
	  when('/', {
	    templateUrl: '/source/views/landingPage.html',
	    controller: 'myCtrl'
	  }).
	  when('/login', {
	    templateUrl: '/source/views/login.html',
	    controller: 'myCtrl'
	  }).
	  otherwise({
	    redirectTo:"/"
	    })

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

	})



/***/ }
/******/ ]);