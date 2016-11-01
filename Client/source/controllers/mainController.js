myApp.controller('myCtrl', function($scope,$location, authService, $window, profileService) {

  $scope.authService=authService;
  
  $scope.login = () => {
    authService.login($scope, $scope.userNameLogin, $scope.passwordLogin);
  };

  $scope.signup = () => {
    authService.signup($scope, $scope.userName, $scope.password, $scope.passConf);
  };

  $scope.logout = () =>{
    authService.logout($scope);
  }

  $scope.submitProfile= () =>{
    profileService.submitProfile();
  };

  $scope.checkPref=()=>{
    console.log("this is what scope is giving", authService.check("preferences"))
    return authService.check("preferences");
  };

});