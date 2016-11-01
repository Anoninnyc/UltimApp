myApp.service('authService', function($location, $window) {
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
        if (typeof res ==="object") {
          this.userName=userName;
          localStorage.userInfo=JSON.stringify(res);;
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
        console.log(typeof res, res);
        if (typeof res==="object") {
          console.log("going home", res);
          this.userName=userName;
          localStorage.userInfo=JSON.stringify(res);
          //localStorage.userInfo= "blahblahblah"

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
      localStorage.userInfo="";
      //$window.localStorage.setItem("userInfo","")
    });
  }

  this.check = (val)=>{
    return JSON.parse($window.localStorage.getItem("userInfo"))[val]
  };

})

myApp.service('profileService', function(authService) {
  this.submitProfile= ()=>{

  const dropDowns = [$("#firstDD :selected").text(),$("#secondDD :selected").text(),$("#thirdDD :selected").text(),$("#fourthDD :selected").text()];
  const handles = [$("#custom-handle").text(),$("#custom-handle2").text(),$("#custom-handle3").text(),$("#custom-handle4").text()];
  const radio1 = $("#radio01")[0].checked;
  const radio2= $("#radio02")[0].checked;
  const oneChecked = radio1||radio2;
  const AllDroppedDown =  dropDowns.indexOf("Select an area")<0;
  const allHandled = handles.indexOf("0")<0;
  console.log(dropDowns, handles, radio1,radio2, oneChecked, AllDroppedDown, allHandled);
  $.post('/profile', {preferences:{dropDowns, handles, radio1,radio2, oneChecked, AllDroppedDown, allHandled}, userName:authService.check("userName")}).then((res,err)=>{
    console.log(res, err);
  });

  }

});