myApp.service('addTags', function(sendQuestion) {

  const tagOptions = ["Option1", "Option2", "Option3", "Option4"];
  
  this.addTag = (scope) => {
    console.log("this is tag", $("#tags").val());
    const tag =   $("#tags").val();
    const tagLocation= tagOptions.indexOf(tag);

    if (tagLocation<0) {
      console.log("Not a valid tag")
      return;
    } else {
    $("#askedQuestionTags").append(`<div class="tagName">${tag}</div>`)
     sendQuestion.questionTags.push(tag);
     tagOptions.splice(tagLocation,1);
     console.log("tagsLeft", tagOptions)
    }
  }
});