function showNotification(title, bodyItem, img, link){

    if(Notification.permission === "granted"){
        const notification = new Notification(title, {
            body :  bodyItem,
            icon: img
        });

        notification.onclick = (e) => {
            window.open(link, '_blank').focus();
        }

    }else if(Notification.permission !== "denied"){
        Notification.requestPermission().then(permission =>{
            console.log(permission);
            //show for first time when granted
            const notification = new Notification(title, {
                body :  bodyItem,
                icon: img
            });

            notification.onclick = (e) => {
                window.open(link, '_blank').focus();
            }
        });
    }
}

showNotification('TestTitle', 'Body', 'assets/logo/StygixWhite.png', 'https://stygix.azurewebsites.net/');