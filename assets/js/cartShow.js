$(function() {

    $("#message").hide();
    //show item store in local storage
    if (typeof(Storage) !== "undefined") {
        if (JSON.parse(localStorage.getItem("Cart")) != null) {
            $("#itemAdded").show();
            $("#message").hide();

            let cartArray = JSON.parse(localStorage.getItem(localStorage.key(i)));

            for (var i = 0; i < cartArray.length; i++) {
                //retrieve from local storage

                let pid = parseInt(cartArray[i].product_ID) - 1;
                console.log(pid);
                let product_quantity = cartArray[i].product_quantity;

                //show the item
                $("#itemAdded").append(
                    '<div class="row"> <div class="col-sm-4">' + '<img src="' + product[pid].img[0] + '" alt="' + product[pid].name + '" class = "imgcart">' + '</div>' +
                    '<div class="col-sm-8">' + '<div><b>' + product[pid].name.substring(0, 30) + '</b></div>' +
                    '<div>' + product[pid].desc + '</div>' +
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
    $("#itemAdded").on('change', $("#qty"), function(e) {
        e.preventDefault();
        alert("Changes");
    });

    //add quantity
    $("#itemAdded").on("click", $("#add"), function(e) {
        e.preventDefault();
        alert("add");
    });

    //deduct quantity
    $("#itemAdded").on("click", $("#deduct"), function(e) {
        e.preventDefault();
        alert("deduct");
        // if(quanity == 0 ) invoke delete item
    });

    //delete the item when user click delete
    $("#itemAdded").on("click", $("#deleteItem"), function(e) {
        e.preventDefault();
        alert("delete");
        // if(quanity == 0 ) invoke delete item
        // localStorage.removeItem(localStorage.key());
        //location.reload();
    });

});