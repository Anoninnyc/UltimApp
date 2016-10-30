myApp.service('authService', function($location) {
  this.userName='';

  this.signup = (scope, userName, pass, passConf) => {
    console.log(scope, userName, pass, passConf);
    if (pass.length < 1 || pass.length > 25) {
      console.log("Pass length must be right")
    } else if (pass !== passConf) {
      console.log("They don't match!")
    } else {
      $.post("/signup", {
        userName,
        pass,
        passConf
      }).then((res, err) => {
        if (res.indexOf("created")>-1) {
          this.userName=userName;
          $location.path("/inside");
          scope.$apply();
        } else {
          console.log("Username taken!!")
        }

      })
    }
  }

  this.login = (scope, userName, pass) => {
    console.log (userName, pass);
    if (userName.length < 50 && pass.length < 50) {
      $.post("/login", {
        userName,
        pass
      }).then((res, err) => {
        if (res.indexOf("foundOne")>-1) {
          console.log("going home");
          this.userName=userName;
          $location.path("/inside");
          scope.$apply();          

        } else {
          console.log("Bad login!!")
        }


      })
    }
  }

  this.logout = scope => {
    $.post("/logout", {
      "logout": "now"
    }).then((res, err) => {
      console.log("calledback!", res, err)
      scope.user="";
      $location.path("/");
      //scope.$apply();
    });
  }

  this.check = ()=>{
    return this.userName;
  };

})
