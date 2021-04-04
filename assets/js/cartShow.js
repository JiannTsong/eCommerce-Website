$(function() {

    $("#message").hide();
    //show item store in local storage
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
                    '<div class="row" data-cartid = "' + (pid+1) + '" style = "padding-top: 50px"> <div class="col-sm-4">' + '<a href="product.html?id='+(pid+1)+'"><img src="' + product[pid].img[0] + '" alt="' + product[pid].name + '" class="imgcart"></a>' + '</div>' +
                    '<div class="col-sm-8">' + '<div style = "font-size: 20px;"><a href="product.html?id='+(pid+1)+'" class="cart_link"><b>' + product[pid].name.substring(0, 30) + '</b></a></div>' +
                    '<div><i style = "justify-content: space-evenly;">' + product[pid].desc + '</i></div>' +
                    '<div class="cartprice"> RM ' + product[pid].price + '</div>' +
                    '<div>' + '<span id = "add" style = "padding-right: 10px;"><i class="fas fa-plus iconwidth"></i></span><span><input type="number" id = "qty" value = "' + product_quantity + '" style = "width: 3.5rem;" min = "0" max = "' + product[pid].stock + '"></span><span id = "deduct" style = "padding-right: 10px; padding-left: 10px;"><i class="fas fa-minus iconwidth2"></i></span><span id = "deleteItem"><i class="fas fa-trash-alt"></i></span></div></div>');
            }
        } else {
            $("#itemAdded").hide();
            $("#message").show().html("Your shopping cart is empty. Enjoy your shopping!");
        }
    } else {
        $("#itemAdded").hide();
        $("#message").show().html("Your shopping cart is empty. Enjoy your shopping!");
    }

    //clear all cart when user click clear all
    $("#clear").click(function() {
        localStorage.removeItem("Cart");
        location.reload();
    });

    //change on effect - quantity
    $("#itemAdded > div.row").on('change', "#qty", function(e) {
        e.preventDefault();
        let cartid = $(this).closest("div.row").data("cartid");//get data cartid from it's parent

        let newQty = $(this).val();

        let cartArray = JSON.parse(localStorage.getItem("Cart"));

        if (newQty > 0) {
            for (let i = 0; i < cartArray.length; i++) {
                if (cartid == cartArray[i].product_ID) {
                    cartArray[i].product_quantity = newQty;
                    localStorage.setItem("Cart", JSON.stringify(cartArray));
                }
            }
        } else if (newQty == 0) {
            for (let i = 0; i < cartArray.length; i++) {
                if (cartid == cartArray[i].product_ID) {
                    delete cartArray[i];

                    let filtered = [];//declare array list var

                    //recreate array list wiithout null element
                    filtered = cartArray.filter(function(el){
                        return el != null;
                    });

                    //remove whole localSotrage item if no item in the array list
                    if(filtered.length == 0){
                        localStorage.removeItem("Cart");
                    }else{
                        localStorage.setItem("Cart", JSON.stringify(filtered));
                    }

                    console.log("Item have been successfully removed");
                    location.reload();//relaod if item is deleted
                }
            }
        } else {
            console.log("Something went wrong! Please try again.")
        }

    });

    //add quantity
    $("#itemAdded > div.row").on("click", "#add", function(e) {
        e.preventDefault();
        let cartid = $(this).closest("div.row").data("cartid");//get data cartid from it's parent

        let cartArray = JSON.parse(localStorage.getItem("Cart"));

        for (let i = 0; i < cartArray.length; i++) {
            if (cartid == cartArray[i].product_ID) {
                cartArray[i].product_quantity = parseInt(cartArray[i].product_quantity) + 1;

                localStorage.setItem("Cart", JSON.stringify(cartArray));

                console.log("Item have been successfully added");
            }
        }
        location.reload();
    });

    //deduct quantity
    $("#itemAdded > div.row").on("click", "#deduct", function(e) {
        let cartid = $(this).closest("div.row").data("cartid");

        let cartArray = JSON.parse(localStorage.getItem("Cart"));

        for (let i = 0; i < cartArray.length; i++) {
            if (cartid == cartArray[i].product_ID) {
                cartArray[i].product_quantity = parseInt(cartArray[i].product_quantity) - 1;

                if (cartArray[i].product_quantity > 0) {
                    localStorage.setItem("Cart", JSON.stringify(cartArray));

                    console.log("Item have been successfully deducted !");
                } else if (cartArray[i].product_quantity == 0) {

                    delete cartArray[i];//delete the target element in array

                    let filtered = [];//declare array list var

                    //recreate array list without null element
                    filtered = cartArray.filter(function(el){
                        return el != null;
                    });

                    //remove array if no more element in array
                    if(filtered.length == 0){
                        localStorage.removeItem("Cart");
                    }else{
                        localStorage.setItem("Cart", JSON.stringify(filtered));
                    }

                    console.log("Item have been successfully deleted !");
                } else {
                    console.log("Something went wrong during deduct item ! Please try again.");
                }
            }
        }

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
                delete cartArray[i];//delete the item from array

                let filtered = [];//declare array list var

                //recreate array list without null element
                filtered = cartArray.filter(function(el){
                    return el != null;
                });

                //remove array if no more element in array
                if(filtered.length == 0){
                    localStorage.removeItem("Cart");
                }else{
                    localStorage.setItem("Cart", JSON.stringify(filtered));
                }

                console.log("Item have been successfully deleted");
            }
        }

        location.reload();
    });

});