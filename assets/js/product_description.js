function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
let pid = getQueryString("id");

function fetchProduct() {
    for(let i = 0; i < product.length; i++){
        if(pid == (i+1)){
            $("#product_title").append('<h2>'+product[i].name+'</h2>');
            $("#product_price").append('<h5>RM'+product[i].price+'</h5>');
            $("#product_quantity").attr("max", product[i].stock);
            for(let j = 0; j < product[i].img.length; j++){
                if(j == 0){

                    $("div .carousel-item").append('<img class="d-block w-100" src="'+product[i].img[j]+'">');
                }else {
                    $("ol.carousel-indicators").append('<li data-target="#product_image" style="background-color: #000000;" data-slide-to="' + j + '"></li>');
                    $('div.carousel-inner').append('<div class="carousel-item"><img class="d-block w-100" src="'+product[i].img[j]+'"></div>');
                }
            }

            //Object.entries(product[i].extra_desc).forEach(([k, v], h) => console.log(h,k,v));

            for(let d = 0; d < Object.entries(product[i].extra_desc).length; d++){
                let dt = '<dt class="col-sm-3" style="margin-top:1rem;margin-bottom:1rem;">'+Object.entries(product[i].extra_desc)[d][0]+'</dt>';
                let dd = '<dd class="col-sm-9" style="margin-top:1rem;margin-bottom:1rem;">'+Object.entries(product[i].extra_desc)[d][1]+'</dd>'
                $("dl.row").append(dt);
                $("dl.row").append(dd);
            }
        }
    }
};

window.onload = fetchProduct();



$("#minus_quantity").click(function () { 
    let current = $("#product_quantity").val();
    if(current != 0){
        $("#product_quantity").val(parseInt(current)-1);
    }
 });

 $("#plus_quantity").click(function () { 
    let current = $("#product_quantity").val();
    if(current < product[pid-1].stock){
        $("#product_quantity").val(parseInt(current)+1);
    }
 });