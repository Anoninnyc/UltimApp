myApp.controller('myCtrl', function($scope, authService) {
  $scope.login = () => {
    authService.login($scope, $scope.userNameLogin, $scope.passwordLogin)
    // $scope.userName = '';
     $scope.password = '';
     $scope.passConf = '';
  };

  $scope.signup = () => {
    authService.signup($scope, $scope.userName, $scope.password, $scope.passConf)
    // $scope.userName = '';
     $scope.password = '';
     $scope.passConf = '';
  };

  $scope.logout = () =>{
    console.log("controller calling logout!")
    authService.logout($scope);
  }

});
