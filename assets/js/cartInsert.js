$(function () {
    $("#addToCart").click(function () {

        let id = $(this).data("product-id");
        let quantity = parseInt($("#product_quantity").val());


        if (typeof (Storage) !== "undefined") {
            let cartArray = [];

            //check if cart json already exists
            if (!(localStorage.getItem("Cart") == null || localStorage.getItem("Cart") == "")) {
                cartArray = JSON.parse(localStorage.getItem("Cart"));
            }

            //loop in cart to found and update
            let updateStatus = false;
            for (let f = 0; f < cartArray.length; f++) {
                if (cartArray[f].product_ID == id) {
                    cartArray[f].product_quantity = cartArray[f].product_quantity + quantity;
                    updateStatus = true;
                }
            }

            //if not found after loop then create new
            if (!updateStatus) {
                let cart = new Object();
                cart.product_ID = id;
                cart.product_quantity = quantity;

                //push item into array
                cartArray.push(cart);
            }


            //store it and display successful message
            localStorage.setItem("Cart", JSON.stringify(cartArray));

            $("div.card.shadow > div.container-fluid").prepend('<div class="alert alert-success" role="alert" style="margin-top:1rem;margin-bottom:1rem;">' +
                'Successfully added to your cart !' +
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

            //make an immediate update to cart icon counting
            if (JSON.parse(localStorage.getItem("Cart")) !== null) {
                $("#cart-count").html(JSON.parse(localStorage.getItem("Cart")).length);
            } else {
                $("#cart-count").html(0);
            }
        } else {
            console.log("no Local Storage available");
        }

    });
});