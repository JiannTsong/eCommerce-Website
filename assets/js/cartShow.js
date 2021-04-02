$(function() {

    $("#message").hide();
    //show item store in local storage
    if (typeof(Storage) !== "undefined") {
        if (JSON.parse(localStorage.getItem("Cart")) != null) {
            $("#itemAdded").show();
            $("#message").hide();

            for (var i = 0; i < localStorage.length; i++) {
                //retrieve from local storage
                cartArray = JSON.parse(localStorage.getItem(localStorage.key(i)));
                var id = cartArray.product_ID;
                var product_quantity = cartArray.product_quantity;

                //show the item
                $("#itemAdded").append(
                    '<div class="row"> <div class="col-sm-4">' + '<img src="' + product[id].img[0] + '" alt="' + product[id].name + '">' + '</div>' +
                    '<div class="col-sm-8">' + '<div><b>' + product[id].name.substring(0, 30) + '</b></div>' +
                    '<div> RM ' + product[id].price + '</div>' + '<div>' + '<span id = "add"><i class="fas fa-plus"></i></span><span>' + product_quantity + '</span><span id = "deduct"><i class="fas fa-minus"></i></span><span id = "deleteItem"><i class="fas fa-trash-alt"></i></span></div></div>');
            }
        } else {
            $("#itemAdded").hide();
            $("#message").show().html("Your shopping cart is empty. Enjoy your shopping!");
        }
    } else {
        $("#itemAdded").hide();
        $("#message").show().html("Your shopping cart is empty. Enjoy your shopping!");
    }

    //delete the item when user click delete
    $("#deleteItem").click(function() {
        localStorage.removeItem(localStorage.key());
        //location.reload();
    });

    //clear all cart when user click clear all
    $("#clear").click(function() {
        localStorage.clear();
    });

    //add quantity
    $("itemAdded").on("click", '$("#add")', function() {

    });

    //deduct quantity
    $("itemAdded").on("click", '$("#deduct")', function() {

        // if(quanity == 0 ) invoke delete item
    });

});