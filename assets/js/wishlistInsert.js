$(function () { 
    $("button#addToWishlist").click(function () { 
        let id = $(this).data("product-id");
        console.log("id = "+id);
        

        if (typeof(Storage) !== "undefined") {
            let wishlistArray = [];

            //check if wish json already exists
            if(!(localStorage.getItem("Wishlist") == null || localStorage.getItem("Wishlist") == "")){
                wishlistArray = JSON.parse(localStorage.getItem("Wishlist"));
            }

            //loop in wish to found and update
            let updateStatus = false;
            for(let f = 0; f< wishlistArray.length; f++){
                if(wishlistArray[f] == id){
                    updateStatus = true;
                }
            }

            //if not found after loop then create new
            if(!updateStatus){
                    //push item into array
                    wishlistArray.push(id);
            }


            //store it and display successful message
            localStorage.setItem("Wishlist", JSON.stringify(wishlistArray));

            $("div.card.shadow > div.container-fluid").prepend('<div class="alert alert-success" role="alert" style="margin-top:1rem;margin-bottom:1rem;">'+
            'Successfully added to your wishlist !'+
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span> </button>'+
            '</div>');
            
        }else{
            console.log("no Local Storage available");
        }
    });
 });