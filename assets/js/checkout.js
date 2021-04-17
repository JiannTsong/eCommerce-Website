$(function(){

    //warning alert box function
    function warnError(title, message){
        $("div.container.shadow.p-3.mb-5.bg-white.rounded").prepend(
            '<div class="alert alert-warning alert-dismissible fade show" role="alert">'+
            '<span class="alert-inner--icon"><i class="fas fa-exclamation-triangle"></i></span>'+
            '<span class="alert-inner--text"><strong>'+title+'</strong> '+message+'</span>'+
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
            '<span aria-hidden="true">×</span>'+
            '</button>'+
          '</div>'
        );
    }

    $.getJSON("assets/json/product_details.json").done(function(product){
        let totalPayment = 0;
        let OrderDetail = [];//for push to firestore 
        
        if (typeof(Storage) !== "undefined") {
            if (JSON.parse(localStorage.getItem("Cart")) != null) {
    
                let cartArray = JSON.parse(localStorage.getItem("Cart"));
                
                for (let i = 0; i < cartArray.length; i++) {
                    //retrieve from local storage
    
                    let pid = parseInt(cartArray[i].product_ID) - 1;
    
                    let product_quantity = cartArray[i].product_quantity;

                    //created object for push to order_detail array
                    let newProduct = new Object();
                    newProduct.pid = product[pid].id;
                    newProduct.price = product[pid].price;
                    newProduct.quantity = cartArray[i].product_quantity;

                    OrderDetail.push(newProduct);
    
                    //show the item
                    $("#itemAdded").append(
    
                        '<div class="row" data-cartid = "' + (pid + 1) + '" style = "padding-top: 50px"> <div class="col-sm-4">' + '<a href="product.html?id=' + (pid + 1) + '"><img src="' + product[pid].img[0] + '" alt="' + product[pid].name + '" class="imgcart"></a>' + '</div>' +
                        '<div class="col-sm-8">' + '<div style = "font-size: 20px;"><a href="product.html?id=' + (pid + 1) + '" class="cart_link"><b>' + product[pid].name.substring(0, 30) + '</b></a></div>' +
                        '<div><p style = "font-style:italic;justify-content: stretch;text-align: justify; text-justify: inter-word;">' + product[pid].desc + '</p></div>' +
                        '<div class="cartprice"> RM ' + product[pid].price + '</div>' +
                        'Product Quantity : ' + product_quantity);
                    
                    totalPayment += (product_quantity*product[pid].price);

                }

                $("div.container.shadow.p-3.mb-5.bg-white.rounded").append(
                    '<div style="margin-top:2rem;">'+
                    '<h6>Subtotal : RM '+totalPayment+'</h6>'+
                    '<h6>Shipping Fee : RM10</h6>'+
                    '<h5>Total : RM'+(totalPayment+10)+'</h5>'+
                    '</div>'
                    );

                $("div.container.shadow.p-3.mb-5.bg-white.rounded").append(
                    '<div class="d-flex flex-row-reverse" >'+
                        '<div class="p-2"><button id="paynow" type="button" class="btn btn-default" style="right: 2rem;">Pay Now</button></div>'+
                    '</div>'
                );
            } else {
                warnError("Error !", "Cannot checkout with no product in your cart list !");
            }
        } else {
            warnError("Error !", "Error while reading your cart list !");
        }



        $("button#paynow").click(function(){
            firebase.auth().onAuthStateChanged(function (user) {
                if(!user){
                    //warn user to login
                    warnError("Error !", "Please login to continue checkout !");
                }else{
                    let user = firebase.auth().currentUser;
                    let userId = user.uid;

                    let shipAddress = "";
                    db.collection("users").doc(userId).get().then((item) => {
                        if(item.data().address){//check for shipping address exist in firestore's users or not
                            shipAddress = item.data().address;

                            let order = {
                                "product" : OrderDetail,
                                "total" : totalPayment,
                                "shipping" : 10,
                                "shipAddress" : shipAddress,
                                "date" : Date.now()
                            }
                            //alert(JSON.stringify(order) + "\n\n" + userId);
                            db.collection("orders").doc(userId).get("order_detail").then((docs) => {

                                //if the order_detail array does not exists in firestore's orders collection
                                if(!docs.exists){

                                    //create document array
                                    db.collection("orders").doc(userId).set({
                                        order_detail : []
                                    });
                                    
                                    //push javascript object into the array in firestore
                                    db.collection("orders").doc(userId).update({
                                        order_detail : firebase.firestore.FieldValue.arrayUnion(order)
                                    }).then(function(){
                                        localStorage.removeItem("Cart");

                                        //notice user via web notification
                                        if (Notification.permission === "granted") {//permission is granted(allowed)
                                            const notification = new Notification("Order #"+order.date, {
                                                body: 'Successfuly placed an order !'
                                            });
                
                                            notification.onclick = (e) => {
                                                window.open('orders.html', '_blank').focus();
                                            }
                
                                        } else if (Notification.permission !== "denied") {//permission is not granted or denied(user does not responses to the request)
                                            Notification.requestPermission().then(permission => {
                                                console.log(permission);
                                                //show for first time when granted
                                                const notification = new Notification("Order #"+order.date, {
                                                    body: 'Successfuly placed an order !'
                                                });
                
                                                notification.onclick = (e) => {
                                                    window.open('orders.html', '_blank').focus();
                                                }
                                            });
                                        }

                                        //redirect user to success page
                                        window.location.href = "checkout_success.html";
                                        //alert("yes checkout");
                                    }).catch((error) => {
                                        console.log(error);
                                    })
                                }else{
                                    //push javascript object to firestore
                                    db.collection("orders").doc(userId).update({
                                        order_detail : firebase.firestore.FieldValue.arrayUnion(order)
                                    })
                                    .then(function(){
                                            //clear the Cart json array in local Storage
                                            localStorage.removeItem("Cart");

                                            //notice user via web notification
                                            if (Notification.permission === "granted") {
                                                const notification = new Notification("Order #"+order.date, {
                                                    body: 'Successfuly placed an order !'
                                                });
                    
                                                notification.onclick = (e) => {
                                                    window.open('orders.html', '_blank').focus();
                                                }
                    
                                            } else if (Notification.permission !== "denied") {
                                                Notification.requestPermission().then(permission => {
                                                    console.log(permission);
                                                    //show for first time when granted
                                                    const notification = new Notification("Order #"+order.date, {
                                                        body: 'Successfuly placed an order !'
                                                    });
                    
                                                    notification.onclick = (e) => {
                                                        window.open('orders.html', '_blank').focus();
                                                    }
                                                });
                                            }

                                            //redirect page
                                            window.location.href = "checkout_success.html";
                                            //alert("yes checkout");
                                    })
                                    .catch((error) => {
                                            console.log(error);
                                    });
                                }
                            })
                        }else{
                            warnError("Error", "No shipping address is provided !");
                        }
                    }); 
                          
                }
            });
        });
    });

});