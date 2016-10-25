myApp.controller('myCtrl', function($scope, authService) {
	$scope.login = ()=>{
		authService.login($scope,$scope.userName,$scope.password,$scope.passConf)

  $scope.userName='';
  $scope.password='';
  $scope.passConf='';

	};



});