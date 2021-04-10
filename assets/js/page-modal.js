$(function(){
    $("head").append('<link rel="stylesheet" href="assets/css/page-modal.css">');
    $("body").append('<div id="promote-myModal" class="promote-modal">'+
          '<div class="promote-modal-content">'+
            '<span class="promote-close">&times;</span>'+
            '<a href="product.html?id=29">'+
            '<img src="assets/img/promotion/acerus_21q2_ecomm_w15_swift_1620x600.png" alt="Acer Swift 3">' +
            '</a>'+
          '</div>'+
        '</div>'
    );

    if(typeof(Storage) !== "undefined"){
        
        if(localStorage.getItem("hide_promote_banner") !== null || localStorage.getItem("hide_promote_banner") !== ""){
            let promote = localStorage.getItem("hide_promote_banner");
            if(promote !== "true"){
                $("div#promote-myModal").show();
            }else{
                $("div#promote-myModal").hide();
            }
        }else{
            $("div#promote-myModal").show();
        }
    }

    $("span.promote-close").click(function(){
        hideModal();
    });

    $("div#promote-myModal").click(function(e){
        hideModal();
    });

    $("div.promote-modal-content > a").on("click", "img", function(e){
        if(e.target == this){
            hideModal();
        }
    });

    function hideModal(){
        $("div#promote-myModal").hide();
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem("hide_promote_banner", "true");
        }
    }
    
});