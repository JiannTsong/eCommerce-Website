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

        
        }
    });
});