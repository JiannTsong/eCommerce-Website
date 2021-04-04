if ("serviceWorker" in navigator){
    //
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("Service Worker registered.");
        console.log(registration);
    }).catch(error =>{
        console.log("Service Worker registration failed.");
    })
}else{
    console.log("Service Worker is not available !");
}