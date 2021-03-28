$(function(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          window.location.href = "/account.html";
        } else {
          // No user is signed in.
        }
      });

    $("#login").click(function(){
        login();
    });

    function login() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
    
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("Error : " + errorMessage);
            });
    }
});

