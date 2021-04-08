function showNotification(){
    const notification = new Notification("New Message", {
        body : "Body item",
        icon: "assets/logo/StygixWhite.png"
    });

    notification.onclick = (e) => {
        window.location.href = "https://www.google.com";
    }
}

if(Notification.permission === "granted"){
    console.log("Notification Granted");
    showNotification();
}else if(Notification.permission !== "denied"){
    Notification.requestPermission().then(permission =>{
        console.log(permission);
        //show for first time when granted
        showNotification();
    });
}