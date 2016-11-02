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
    })





  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

})
