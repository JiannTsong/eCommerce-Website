$(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            // No user is signed in.
            window.location.href = "./login.html";

        }else{
            //console.log(user);

            var name, email, photoUrl, uid, emailVerified;
            var cuser = firebase.auth().currentUser;
            if (cuser != null) {
                name = cuser.displayName;
                email = cuser.email;
                photoUrl = cuser.photoURL;
                emailVerified = cuser.emailVerified;
                uid = cuser.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                // this value to authenticate with your backend server, if
                // you have one. Use User.getToken() instead.
            }
            $("#acc_profile").append("")
        }
    });


    $("#sign-out").click(function () {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            window.location.href = "./login.html?logout=success";
        }).catch((error) => {
            // An error happened.
            alert("Sign out error: " + error.message);
        });
    });
});

