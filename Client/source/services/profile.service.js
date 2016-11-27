myApp.service('profileService', function(authService, $window) {

  this.redo = false; 

  this.submitProfile= scope =>{
  const dropDowns = [$("#firstDD :selected").text(),$("#secondDD :selected").text(),$("#thirdDD :selected").text(),$("#fourthDD :selected").text()];
  const handles = [$("#custom-handle").text(),$("#custom-handle2").text(),$("#custom-handle3").text(),$("#custom-handle4").text()];
  const radio1 = $("#radio01")[0].checked;
  const radio2= $("#radio02")[0].checked;
  const oneChecked = radio1||radio2;
  const AllDroppedDown =  dropDowns.indexOf("Select an area")<0;
  const allHandled = handles.indexOf("0")<0;
  console.log(dropDowns, handles, radio1,radio2, oneChecked, AllDroppedDown, allHandled);
  $.post('/profile', {preferences:{dropDowns, handles, radio1,radio2, oneChecked, AllDroppedDown, allHandled}, userName:authService.check("userName")}).then((res,err)=>{
    console.log("this is res", JSON.stringify(res),err)
    if (err!=="Success"){
      res.questions = JSON.parse(localStorage.userInfo).questions;
      localStorage.userInfo=JSON.stringify(res);
      scope.$apply();
    }
  });
}

  this.redoProfile = () =>{

    console.log("runningREDO!", authService.check("preferences"));
    if (authService.check("preferences")){
    this.redo = !this.redo; 
    console.log("status of redo", this.redo)
    }
  }

});
