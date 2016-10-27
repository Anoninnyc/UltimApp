myApp.service('authService', function($http) {

  this.signup = (scope, userName, pass, passConf) => {
        if (pass.length<7 ||pass.length>25 ){
          console.log("Pass length must be right")
      } else if (pass!==passConf){
        console.log("They don't match!")
      } else {
        $.post("/login" , {userName, pass, passConf})
      }
  }

  this.login= (scope, userName, pass) =>{
    if (userName.length<50 && pass.length<50){
      $.post("/login" , {userName, pass})
    }

  }


})