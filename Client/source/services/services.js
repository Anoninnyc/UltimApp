myApp.service('authService', function($location) {

  this.signup = (scope, userName, pass, passConf) => {
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
        if (res === "created") {
          $location.path("/");
          scope.$apply();
        } else {
          console.log("Username taken!!")
        }

      })
    }
  }

  this.login = (scope, userName, pass) => {
    if (userName.length < 50 && pass.length < 50) {
      $.post("/login", {
        userName,
        pass
      }).then((res, err) => {
        if (res === "foundOne") {
          console.log("going home");
          $location.path("/inside")
          scope.$apply();
        } else {
          console.log("Bad login!!")
        }
      })
    }

  }

  this.logout = (scope) => {
    $.post("/logout", {
      "logout": "now"
    }).then((res, err) => {
      console.log("calledback!", res, err)
      $location.path("/");
      scope.$apply();
    });
  }

})
