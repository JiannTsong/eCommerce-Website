
$(function () {
    if (typeof (Storage) !== "undefined") {
        //$("#cart-count").text(localStorage.getItem(""));//retrieve
    }

    // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "AIzaSyBUI47vHCW6nF-wKjyKRZJUyM__ijNFxvE",
            authDomain: "stygix-1d87b.firebaseapp.com",
            projectId: "stygix-1d87b",
            storageBucket: "stygix-1d87b.appspot.com",
            messagingSenderId: "905203629267",
            appId: "1:905203629267:web:6f3ad8103aee3c2a586826",
            measurementId: "G-S3BZGPK1SN"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
        var db = firebase.firestore();//firestore database connection

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in. redirect to user profile page.
                //alert(user.uid);
                //window.location.href = "/account.html";
            }
        });

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

        document.getElementById("sign-up").addEventListener("click", function(){
            signup();
        });

        function signup() {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            var username = document.getElementById("username").value;

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
            });
            
        }

        function login() {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    alert("Error : " + errorMessage);
                });
        }
        
})