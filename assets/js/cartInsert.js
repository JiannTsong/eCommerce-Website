$(function() {
    $("#addToCart").click(function(event) {
        event.preventDefault();

        var id = $(this).data("id");
        var quantity = parseInt($("#quantity").val());

        var cart = new Object();
        cart.product_ID = id;
        cart.product_qty = quantity;

        //push item into array
        cartArray.push(cart);

        //store it and display successful message
        if (typeof(storage) !== "undefined") {
            localStorage.setItem("Cart", JSON.stringify(cartArray));

            $("#displayAlert").html("This item have been added into cart.");
        }
    });
});