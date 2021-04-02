$(function() {

    //show item store in local storage
    if (typeof(Storage) !== "undefined") {
        if (JSON.parse(localStorage.getItem("Cart")) != null) {
            for (var i = 0; i < localStorage.length; i++) {
                //retrieve from local storage
                cartArray = JSON.parse(localStorage.getItem(localStorage.key(i)));
                var id = cartArray.product_ID;
                var product_quantity = cartArray.product_quantity;

                //show the item
                $("#item_added").append(
                    '<div class="row"> <div class="col-sm-4">' + '<img src="' + product[id].img[0] + '" alt="' + product[id].name + '">' + '</div>' +
                    '<div class="col-sm-8">' + '<div><b>' + product[id].name.substring(0, 30) + '</b></div>' +
                    '<div> RM ' + product[id].price + '</div>' + '<div>' + '<span><i class="fas fa-plus"></i></span><span>' + product_quantity + '</span><span><i class="fas fa-minus"></i></span>' + '</div>' + '<div id = "deleteItem"><i class="fas fa-trash-alt"></i></div>' + '</div>');
            }
        } else {
            $("#item_added").html() = '<div class="row">There are no item item selected</div>';
        }
    }

    //delete the item when user click delete
    $("#deleteItem").click(function() {
        var id = $(this).data("cartProduct");
        localStorage.removeItem("");
        location.reload();
    });

    //clear all cart when user click clear all
    $("#clear").click(function() {
        localStorage.clear();
    });
});