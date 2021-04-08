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
//firebase.analytics();
var db = firebase.firestore();//firestore database connection

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in. redirect to user profile page.
        //alert(user.uid);
        //window.location.href = "/account.html";
        $("#user_icon").attr("href", "./account.html");
    }else{
        $("#user_icon").attr("href", "./login.html");
    }
});
