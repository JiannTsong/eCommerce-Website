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
        
                firebase.auth().currentUser.updateProfile({
                    displayName: new_username,
                });

        
                db.collection("users").doc(user.uid).set({
                    username : new_username,
                    address : new_addr
                }).then(() => {
                        //$("#profile_updated").addClass("show");
                        $('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                        '<span class="alert-inner--text">Success to save profile details!</span>'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">×</span>'+
                        '</button>'+
                        '</div>').insertAfter("div.container.shadow.p-3.mb-5.bg-white.rounded > h3");
                    })
                    .catch((error) => {
                        $('<div class="alert alert-warning alert-dismissible fade show" role="alert">'+
                        '<span class="alert-inner--text">Failed to save profile details!</span>'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                        '<span aria-hidden="true">×</span>'+
                        '</button>'+
                        '</div>').insertAfter("div.container.shadow.p-3.mb-5.bg-white.rounded > h3");
                        console.error("Error writing document: ", error.message);
                    });
            });

            $("#save_new_pass").click(function(){
                let user = firebase.auth().currentUser;
                $("#success_pass_result").css("display", "none");
                $("#fail_pass_result").css("display", "none");
                let old_pass = $("input[type='password'][name='old_pass']").val();
                let new_pass = $("input[type='password'][name='new_pass']").val();

                let credential = firebase.auth.EmailAuthProvider.credential(
                    user.email, 
                    old_pass
                );
                // Now you can use that to reauthenticate
                user.reauthenticateWithCredential(credential);

                user.updatePassword(new_pass).then(function() {
                    // Update successful.
                    $("#success_pass_result").css("display", "block");
                  }).catch(function(error) {
                    // An error happened.
                    $("#fail_pass_result").css("display", "block");
                  });
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
        }
    });
});

