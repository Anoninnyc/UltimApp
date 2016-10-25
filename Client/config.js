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

