myApp.directive('userQuestion', function($compile) {
console.log("RUNNING userQuestion")
  return {
  	  restrict:"A",
      templateUrl: 'source/views/singleQuestion.html'  
      };
});



myApp.directive('userAnswer', function($compile) {
console.log("RUNNING userQuestion")
  return {
  	  restrict:"A",
      templateUrl: 'source/views/singleAnswer.html'  
      };
});
