function writeRecord(userId, username){
    db.collection("users").doc(userId).set({
        "username" : username
    })
        .then(() => {
            console.log("Document successfully written!");
            //window.location.href = "/login.html";
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

function signup() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;

    let checkPolicy = document.getElementById("checkPolicy").checked;
    if(checkPolicy && email != "" && password != "" && username != ""){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            
            //write username into users profile
            writeRecord(user.uid, username);
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            // ..
            alert("Error : " + errorMessage);
        });
    }else {
        if(!checkPolicy){
            alert("Please agree the privacy policy to continue !");
        }

        if(username == ""){
            alert("Please key in the username.");
        }

        if(email == ""){
            alert("Please key in an email.");
        }

        if(password == ""){
            alert("Please key in the password.");
        }
    }  

    /*
    let testuser = db.collection("users").doc("user.uid");
    testuser.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });*/
    
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in. redirect to profile, redirect after 1 second to avoid the firebase have store the user id to extra table
      window.setTimeout(function(){
        window.location.href = "./account.html";
      }, 1000);
    } else {
      // No user is signed in.
    }
});