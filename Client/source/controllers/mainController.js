myApp.controller('myCtrl', function($scope,$location, authService, $window) {

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

});
