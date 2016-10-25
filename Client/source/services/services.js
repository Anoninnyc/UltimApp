myApp.service('authService', function($http) {

  this.login = (scope, userName, pass, passConf) => {
      //   if (pass.length<7 ||pass.length>25 ){
      //     console.log("Pass length must be right")
      // } else if (pass!==passConf){
      //   console.log("They don't match!")
      // } else {
        //$http.post("/login", {"test":"again"});
        //$.post("login" , {"test":"again"});
        // $http.post("login", {"test":"again"});
        $.post("/login" , {userName, pass, passConf})

        // .then((res)=>{

        // })
        
      //}
  }




})