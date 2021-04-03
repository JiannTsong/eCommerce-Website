$(function() {

    if (typeof(Storage) !== "undefined") {
        if (JSON.parse(localStorage.getItem("Cart")) != null) {
            $("#cart-count").html(JSON.parse(localStorage.getItem("Cart")).length);
        } else {
            $("#cart-count").html(0);
        }
    } else {
        $("#cart-count").html(0);
    }
});