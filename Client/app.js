myApp = angular.module('myApp', ['ui.router', 'ngSanitize'])

require('./config.js');

// myApp.run(function($rootScope,$location) {

//     $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
//     	console.log("CHAHED!")
//     	 $rootScope.actualLocation = $location.path();
//     })

//     $rootScope.$on("$routeChangeStart", function (event, next, current) {
//     console.log("changed again!")
// 	}); 

// 	 $rootScope.$on("$locationChangeStart", function (event, next, current) {
//     console.log("changed again2!")
// 	}); 

//   $rootScope.$watch(function() {
//     return $location.path()
//   }, function(newLocation) {
//     if ($rootScope.actualLocation === newLocation) {
//       // run a function or perform a reload
//       console.log("run a function or perform a reload");
//     }
//   });
// })

require('./source/controllers/mainController.js');
require('./source/directives/directives.js');
require('./source/services/services.js');


// myApp.run(function($rootScope, $route, $location) {
//   //Bind the $locationChangeSuccess event on the //rootScope, so that we don't need to 
//   //bind in induvidual controllers.

//   $rootScope.$on('$locationChangeSuccess', function() {
//     $rootScope.actualLocation = $location.path();
//   });

//   $rootScope.$watch(function() {
//     return $location.path()
//   }, function(newLocation) {
//     if ($rootScope.actualLocation === newLocation) {

//       // run a function or perform a reload
//     }
//   });
// });
window.onhashchange = function() { 
     console.log("HASHCHANGED!")
}

$(window).on('hashchange', function() {
 console.log("HASHCHANGED!")
});