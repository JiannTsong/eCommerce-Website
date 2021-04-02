$(function(){
    function getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    let pid = getQueryString("id");
    
    function fetchProduct() {
        let img_pointer, img_product_desc;
        for(let i = 0; i < product.length; i++){
            if(pid == (i+1)){
                for(let j = 0; j < product[i].img.length; j++){
                    if(j == 0){
                        img_pointer = '<li data-target="#product_image" data-slide-to="' + j + '"></li>';
                        img_product_desc = '<div class="carousel-item active"><img class="d-block w-100" src="'+product[i].img[j]+'" alt="First slide"></div>';
                    }else {
                        img_pointer = img_pointer + '<li data-target="#product_image" data-slide-to="' + j + '"></li>';
                        img_product_desc = img_product_desc + '<div class="carousel-item active"><img class="d-block w-100" src="'+product[i].img[j]+'" alt="First slide"></div>';
                    }
                }
                $("#img_point").append(img_pointer);
                $('#img_product_desc').append(img_product_desc);
            }
        }
    };

    window.onload = fetchProduct();
});