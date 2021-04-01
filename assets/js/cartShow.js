$(function() {

    if (checkBrowser()) {
        var i;

        if (localStorage.length > 0) {
            for (i = 0; i < localStorage.length; i++) {
                //retrieve from local storage
                var product_img = localStorage.getItem("product-img");
                var product_name = localStorage.getItem("product-name");
                var product_price = localStorage.getItem("product-price");
                var product_quantity = localStorage.getItem("product-quantity");

                //show the item
                $("#item_added").append(
                    '<div class="row"> <div class="col-sm-4">' + product_img + '</div>' +
                    '<div class="col-sm-8">' + '<div>' + product_name + '</div>' + '<div> RM ' + product_price + '</div>' + '<div>' + '<span><i class="fas fa-plus"></i></span><span>' + product_quantity + '</span><span><i class="fas fa-minus"></i></span>' + '</div>' + '</div>' + '</div>');
            }
        } else {
            $("#item_added").html() = '<div class="row">There are no item item selected</div>';
        }
    }
});