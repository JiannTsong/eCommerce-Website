importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyBUI47vHCW6nF-wKjyKRZJUyM__ijNFxvE",
    authDomain: "stygix-1d87b.firebaseapp.com",
    projectId: "stygix-1d87b",
    storageBucket: "stygix-1d87b.appspot.com",
    messagingSenderId: "905203629267",
    appId: "1:905203629267:web:6f3ad8103aee3c2a586826",
    measurementId: "G-7C49C2VT2G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();

messaging.setBackgroundMessagehHandler(function(payload){
    console.log("Payload SW" + payload);
});