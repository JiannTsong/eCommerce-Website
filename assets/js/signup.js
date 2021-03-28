function writeUserData(userId, name) {
    db.collection("users").doc(userId).set({
        "username" : name
    })
        .then(() => {
            ///console.log("Document successfully written!");
            window.location.href = "/login.html";
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
    if(checkPolicy){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            
            //write username into users profile
            writeUserData(user.uid, username);
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            // ..
            alert("Error : " + errorMessage);
        });
    }else {
        alert("Please agree the privacy policy to continue !");
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