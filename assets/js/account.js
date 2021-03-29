$(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            // No user is signed in.
            window.location.href = "./login.html";

        } else {
            //console.log(user);

            var name, email, photoUrl, uid, emailVerified;
            let user = firebase.auth().currentUser;
            if (user != null) {
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                emailVerified = user.emailVerified;
                uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                // this value to authenticate with your backend server, if
                // you have one. Use User.getToken() instead.
            }

            $("#uname").attr("value", name);
            $("#uemail").text(email);

            let uprofile = db.collection("users").doc(uid);
            uprofile.get().then((doc) => {
                if (doc.exists) {
                    if (doc.data().address) {
                        $("#ushipping").text(doc.data().address);
                    } else {
                        console.log("Address does not exists.");
                    }

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

            $("#save_profile").click(function () {
                let new_addr = $("#ushipping").val();
                let new_username = $("#uname").val();
                let new_email = $("#uemail").val();
        
                firebase.auth().currentUser.updateProfile({
                    displayName: new_username,
                });

        
                db.collection("users").doc(user.uid).set({
                    username : new_username,
                    address : new_addr
                }).then(() => {
                        console.log("Success to save");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error.message);
                    });
            });

            $("#change_pass");
        
            $("#sign-out").click(function () {
                firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                    window.location.href = "./login.html?logout=success";
                }).catch((error) => {
                    // An error happened.
                    alert("Sign out error: " + error.message);
                });
            });
        }
    });
});