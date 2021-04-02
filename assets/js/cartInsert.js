$(function() {
    $("#addToCart").click(function() {

        let id = $(this).data("product-id");
        let quantity = parseInt($("#product_quantity").val());
        alert("add");

        if (typeof(storage) !== "undefined") {
            let cartArray = [];
            if(localStorage.getItem("Cart") !== null){
                cartArray = localStorage.getItem("Cart");
            }

            let cart = new Object();
            cart.product_ID = id;
            cart.product_quantity = quantity;

            //push item into array
            
            cartArray.push(cart);
            alert("add2");

            //store it and display successful message
            localStorage.setItem("Cart", JSON.stringify(cartArray));

            $("#displayAlert").html("This item have been added into cart.");
        }

    });
});