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
