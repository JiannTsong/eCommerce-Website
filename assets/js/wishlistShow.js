$(function() {

    $("#message").hide();
    $("#sucessMessage").hide();
    //show item store in local storage

    let aPI = "assets/json/product_details.json";
    $.getJSON(aPI).done(function(product) {
        if (typeof(Storage) !== "undefined") {
            if (JSON.parse(localStorage.getItem("Wishlist")) != null) {
                $("#itemAdded").show();
                $("#message").hide();

                let wishlistArray = JSON.parse(localStorage.getItem("Wishlist"));

                for (let i = 0; i < wishlistArray.length; i++) {

                    //retrieve from local storage
                    let pid = parseInt(wishlistArray[i]) - 1;

                    //show the item
                    $("#itemAdded").append(
                        '<div class="row" data-wishlistid = "' + (pid + 1) + '" style = "padding-top: 50px"> <div class="col-sm-4">' + '<a href="product.html?id=' + (pid + 1) + '"><img src="' + product[pid].img[0] + '" alt="' + product[pid].name + '" class="imgcart"></a>' + '</div>' +
                        '<div class="col-sm-8">' + '<div style = "font-size: 20px;"><a href="product.html?id=' + (pid + 1) + '" class="cart_link"><b>' + product[pid].name.substring(0, 30) + '</b></a></div>' +
                        '<div><p style = "font-style:italic;justify-content: stretch;text-align: justify; text-justify: inter-word;">' + product[pid].desc + '</p></div>' +
                        '<div class="cartprice"> RM ' + product[pid].price + '</div>' +
                        '<div style = "padding-top: 15px"><span><button type="button" class="btn btn-default" id="addtocart">Add to Cart</button></span>' +
                        '<span style = "padding-left: 20px;"><span id = "deleteItem"><i class="fas fa-trash-alt" style="font-size: 1.5rem; vertical-align: middle;"></i></span></span>' +
                        '</div></div></div>');
                    console.log(pid);
                }
            } else {
                $("#itemAdded").hide();
                $("#message").show().html("There are no items in your wishlist");
            }
        } else {
            $("#itemAdded").hide();
            $("#message").show().html("There are no items in your wishlist");
        }

        //clear all cart when user click clear all
        $("#clear").click(function() {
            localStorage.removeItem("Wishlist");
            location.reload();
        });

        //delete the item when user click delete
        $("#itemAdded > div.row").on("click", "#deleteItem", function(e) {
            e.preventDefault();
            let wishlistid = $(this).closest("div.row").data("wishlistid");

            let wishlistArray = JSON.parse(localStorage.getItem("Wishlist"));


            for (let i = 0; i < wishlistArray.length; i++) {
                if (wishlistid == wishlistArray[i]) {
                    delete wishlistArray[i]; //delete the item from array

                    let filtered = []; //declare array list var

                    //recreate array list without null element
                    filtered = wishlistArray.filter(function(el) {
                        return el != null;
                    });

                    //remove array if no more element in array
                    if (filtered.length == 0) {
                        localStorage.removeItem("Wishlist");
                    } else {
                        localStorage.setItem("Wishlist", JSON.stringify(filtered));
                    }

                    console.log("Item have been successfully deleted");
                }
            }
        });

        //add to cart
        $("#itemAdded > div.row").on("click", "div.col-sm-8>div>span>button#addtocart", function(e) {
            e.preventDefault();

            let wishlistid = $(this).closest("div.row").data("wishlistid");

            if (typeof(Storage) !== "undefined") {
                let cartArray = [];

                //check if cart json already exists
                if (!(localStorage.getItem("Cart") == null || localStorage.getItem("Cart") == "")) {
                    cartArray = JSON.parse(localStorage.getItem("Cart"));
                }

                //loop in cart to found and update
                let updateStatus = false;
                for (let f = 0; f < cartArray.length; f++) {
                    if (cartArray[f].product_ID == wishlistid) {
                        ++cartArray[f].product_quantity;
                        updateStatus = true;
                    }
                    localStorage.setItem("Cart", JSON.stringify(cartArray));
                }

                //if not found after loop then create new
                if (!updateStatus) {
                    let cart = new Object();
                    cart.product_ID = wishlistid;
                    cart.product_quantity = 1;

                    //alert(cart.product_ID + " " + cart.product_quantity);

                    //push item into array
                    cartArray.push(cart);
                    localStorage.setItem("Cart", JSON.stringify(cartArray));
                }
            }
            location.reload();
        });
    });
});