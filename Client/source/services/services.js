myApp.service('authService', function() {

  this.signup = (scope, userName, pass, passConf) => {
        if (pass.length<1 ||pass.length>25 ){
          console.log("Pass length must be right")
      } else if (pass!==passConf){
        console.log("They don't match!")
      } else {
        $.post("/signup" , {userName, pass, passConf}).then((res,err)=>{
          console.log(res,err);
        })
  }
}

  this.login= (scope, userName, pass) =>{
    if (userName.length<50 && pass.length<50){
      $.post("/login" , {userName, pass}).then((res,err)=>{
          console.log(res,err);
        })
    }

  }


})