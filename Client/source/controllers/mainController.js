myApp.controller('myCtrl', function($scope,$location, authService, $window, profileService,sendQuestion) {

  $scope.authService = authService;
  $scope.profileService = profileService;
  $scope.sendQuestion= sendQuestion;

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

  $scope.checkPref=()=>{
    return authService.check("preferences");
  };

  $scope.redoProfile =() =>{
    profileService.redoProfile();
  }

  $scope.submitTextQuestion =() =>{
    sendQuestion.submitTextQuestion();
  }

});