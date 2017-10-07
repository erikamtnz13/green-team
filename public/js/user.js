$(document).ready(function(){
    var userName = $("#userName");
    var userPassword = $("#userPassword");


// Adding event listeners to the form to create a new object
  $(document).on("submit", "#userName", handleUserFormSubmit);

  function handleUserFormSubmit(event){
      event.preventDefault();

      if (!nameInput.val().trim()){
          return;
      }
      upsertUser({
          name: userName
          .val()
          .trim()
      });
  }
  function upsertUser(userData){
      $.post("/api/users",userData).then();
  }
})