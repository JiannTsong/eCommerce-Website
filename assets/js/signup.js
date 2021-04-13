function writeRecord(userId, username) {

    db.collection("users").doc(userId).set({
        "username": username
    })
        .then(() => {
            window.location.href = "./account.html";
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
    if (checkPolicy && email != "" && password != "" && username != "") {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                let user = userCredential.user;
                //write username into users profile
                writeRecord(user.uid, username);

                return user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                // ..
                alert("Error : " + errorMessage);
            });
    } else {
        if (!checkPolicy) {
            alert("Please agree the privacy policy to continue !");
        }

        if (username == "") {
            alert("Please key in the username.");
        }

        if (email == "") {
            alert("Please key in an email.");
        }

        if (password == "") {
            alert("Please key in the password.");
        }
    }

}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in. redirect to profile, redirect after 1 second to wait the firebase have store the user id to extra table
        window.setTimeout(function () {
            window.location.href = "./account.html";
        }, 1000);
    } else {
        // No user is signed in.
    }
});