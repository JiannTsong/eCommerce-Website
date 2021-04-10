$(function(){

    $("head").append('<link rel="stylesheet" href="assets/css/page-modal.css">');
    $("body").append('<!-- The Modal -->'+
        '<div id="promote-myModal" class="promote-modal">'+
          '<!-- Modal content -->'+
          '<div class="promote-modal-content">'+
            '<span class="promote-close">&times;</span>'+
            '<a href="product.html?id=29">'+
            '<img src="assets/img/promotion/acerus_21q2_ecomm_w15_swift_1620x600.png" alt="Acer Swift 3">' +
            '</a>'+
          '</div>'+
        '</div>'
    );

    if(typeof(Storage) !== "undefined"){
        
        if(sessionStorage.getItem("hide_promote_banner") !== null || sessionStorage.getItem("hide_promote_banner") !== ""){
            let promote = sessionStorage.getItem("hide_promote_banner");
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
        $("div#promote-myModal").hide();
        if(typeof(Storage) !== "undefined"){
            sessionStorage.setItem("hide_promote_banner", "true");
        }
    });

    $("div#promote-myModal").click(function(e){
        if(e.target == this){
            $("div#promote-myModal").hide();
            if(typeof(Storage) !== "undefined"){
                sessionStorage.setItem("hide_promote_banner", "true");
            }
        }
    });
});