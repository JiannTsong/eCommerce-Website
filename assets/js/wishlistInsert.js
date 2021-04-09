$(function () {
    $("button#addToWishlist").click(function () {
        let id = $(this).data("product-id");


        if (typeof (Storage) !== "undefined") {
            let wishlistArray = [];

            //check if wish json already exists
            if (!(localStorage.getItem("Wishlist") == null || localStorage.getItem("Wishlist") == "")) {
                wishlistArray = JSON.parse(localStorage.getItem("Wishlist"));
            }

            //loop in wish to found and update
            let updateStatus = false;
            for (let f = 0; f < wishlistArray.length; f++) {
                if (wishlistArray[f] == id) {
                    updateStatus = true;
                }
            }

            //if not found after loop then create new
            if (!updateStatus) {
                //push item into array
                wishlistArray.push(id);
            }


            //store it and display successful message
            localStorage.setItem("Wishlist", JSON.stringify(wishlistArray));

            $("div.card.shadow > div.container-fluid").prepend('<div class="alert alert-success" role="alert" style="margin-top:1rem;margin-bottom:1rem;">' +
                'Successfully added to your wishlist !' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span> </button>' +
                '</div>');

            let aPI = "assets/json/product_details.json";
            $.getJSON(aPI).done(function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (id == data[i].id) {
                        if (Notification.permission === "granted") {
                            const notification = new Notification(data[i].name, {
                                body: 'Successfuly added to cart !',
                                icon: data[i].img[0]
                            });

                            notification.onclick = (e) => {
                                window.open('cart.html', '_blank').focus();
                            }

                        } else if (Notification.permission !== "denied") {
                            Notification.requestPermission().then(permission => {
                                console.log(permission);
                                //show for first time when granted
                                const notification = new Notification(title, {
                                    body: 'Successfuly added to cart !',
                                    icon: data[i].img[0]
                                });

                                notification.onclick = (e) => {
                                    window.open('cart.html', '_blank').focus();
                                }
                            });
                        }
                    }
                }
            });

        } else {
            console.log("no Local Storage available");
        }
    });
});