$(function () {
    $("#request_reset").click(function(){
        let auth = firebase.auth();
        let emailAddress = $("#reset_mail").val();

        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            $("#pass_reset_alert").css("display", "block");
        }).catch(function (error) {
            // An error happened.
            alert("Error : " + error.message);
        });
    });
});