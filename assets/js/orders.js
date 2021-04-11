$(function () {

    function orderPrinter(data) { 
        $.getJSON("assets/json/product_details.json").done(function(product){
            $('div.orders>div#no-orders').hide();
            $("div.orders").append('<h6>Order #<strong>'+data.date+'</strong></h6>');
            $("div.orders").append('<h6>Order Date : '+new Date(data.date)+'</h6>');

            for(let i =0;i<data.product.length;i++){
                for(let h=0; h<product.length;h++){
                    if(product[h].id == data.product[i].pid){
                        //print
                        //console.log("Detect : " + product[h].id);
                        $("div.orders").append(
                        '<div class="row" data-cartid = "' + data.product[i].pid + '"> <div class="col-sm-3">' + '<a href="product.html?id=' + data.product[i].pid + '"><img src="' + product[h].img[0] + '" alt="' + product[h].name + '" class="imgcart"></a>' + '</div>' +
                        '<div class="col-sm-9">' + '<div style = "font-size: 20px;"><a href="product.html?id=' + data.product[i].pid + '" class="cart_link"><b>' + product[h].name.substring(0, 30) + '</b></a></div>' +
                        '<div class="cartprice" style="font-size:1rem;"> RM ' + data.product[i].price + '</div>' +
                        'Product Quantity : ' + data.product[i].quantity) + '</div>';
                    }
                }
            }
            $('div.orders').append('<div class="row">'+
                '<div class="col-sm-10">Shipping Fee</div>'+
                '<div class="col-sm-1">RM</div>'+
                '<div class="col-sm-1" style="text-align:right;">'+data.shipping+'</div>'+
            '</div>');

            $('div.orders').append('<div class="row">'+
                '<div class="col-sm-10">Total</div>'+
                '<div class="col-sm-1">RM</div>'+
                '<div class="col-sm-1" style="text-align:right;">'+(data.total+10)+'</div>'+
            '</div>');

            $("div.orders").append('<hr style="margin:0rem 0rem 1rem 0rem;">');
        });
     }

    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            // No user is signed in.
            window.location.href = "./login.html";

        } else {
            //console.log(user);

            let name, email, photoUrl, uid, emailVerified;
            let user = firebase.auth().currentUser;
            if (user != null) {
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                emailVerified = user.emailVerified;
                uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                // this value to authenticate with your backend server, if
                // you have one. Use User.getToken() instead.
            }

            db.collection("orders").doc(uid).get()
            .then(snapshot => {
                //console.log("snapshot"+JSON.stringify(snapshot.data().order_detail));
                snapshot.data().order_detail.forEach(element => {
                    orderPrinter(element);
                    //console.log("firebase = "+JSON.stringify(element));
                });
            });
        
        }
    });
});