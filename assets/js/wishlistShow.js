$(function() {

    $("#message").hide();
    //show item store in local storage

    let aPI = "assets/json/product_details.json";
    $.getJSON(aPI).done(function(product) {
        if (typeof(Storage) !== "undefined") {
            if (JSON.parse(localStorage.getItem("Cart")) != null) {
                $("#itemAdded").show();
                $("#message").hide();

                let cartArray = JSON.parse(localStorage.getItem("Cart"));

                for (let i = 0; i < cartArray.length; i++) {
                    //retrieve from local storage

                    let pid = parseInt(cartArray[i].product_ID) - 1;

                    let product_quantity = cartArray[i].product_quantity;

                    //show the item
                    $("#itemAdded").append(

                        '<div class="row" data-cartid = "' + (pid + 1) + '" style = "padding-top: 50px"> <div class="col-sm-4">' + '<a href="product.html?id=' + (pid + 1) + '"><img src="' + product[pid].img[0] + '" alt="' + product[pid].name + '" class="imgcart"></a>' + '</div>' +
                        '<div class="col-sm-8">' + '<div style = "font-size: 20px;"><a href="product.html?id=' + (pid + 1) + '" class="cart_link"><b>' + product[pid].name.substring(0, 30) + '</b></a></div>' +
                        '<div><p style = "font-style:italic;justify-content: stretch;text-align: justify; text-justify: inter-word;">' + product[pid].desc + '</p></div>' +
                        '<div class="cartprice"> RM ' + product[pid].price + '</div>' +
                        '<div><span id = "deleteItem"><i class="fas fa-trash-alt"></i></span></div></div>' +
                        '<div class="col-sm-4"><div class="p-2"><button type="button" class="btn btn-success" id="addtocart">Add to Cart</button></div></div>');
                }
            } else {
                $("#itemAdded").hide();
                $("#message").show();
            }
        } else {
            $("#itemAdded").hide();
            $("#message").show();
        }

        //clear all cart when user click clear all
        $("#clear").click(function() {
            localStorage.removeItem("Cart");
            location.reload();
        });

        //delete the item when user click delete
        $("#itemAdded > div.row").on("click", "#deleteItem", function(e) {
            e.preventDefault();
            let cartid = $(this).closest("div.row").data("cartid");
            console.log(cartid);

            let cartArray = JSON.parse(localStorage.getItem("Cart"));


            for (let i = 0; i < cartArray.length; i++) {
                if (cartid == cartArray[i].product_ID) {
                    delete cartArray[i]; //delete the item from array

                    let filtered = []; //declare array list var

                    //recreate array list without null element
                    filtered = cartArray.filter(function(el) {
                        return el != null;
                    });

                    //remove array if no more element in array
                    if (filtered.length == 0) {
                        localStorage.removeItem("Cart");
                    } else {
                        localStorage.setItem("Cart", JSON.stringify(filtered));
                    }

                    console.log("Item have been successfully deleted");
                }
            }

            location.reload();
        });


    });




});