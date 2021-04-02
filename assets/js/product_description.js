function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
var pid = getQueryString("id");

function getproduct(products) {
    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < products[i].img; j++) {

            $("#description").append('<div><div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">' +
                '<ol class="carousel-indicators"> <li data-target="#carouselExampleIndicators" data-slide-to="' + j +
                '" class="active"</li></ol>< div class= "carousel-inner" ><div class="carousel-item active"><img class="d-block w-100" src="' + products[i].img[j] +
                '" alt="First slide"></div> <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">' +
                '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a>' +
                '<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">' +
                '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>' +
                '<div><p>' + products[i].name + '</p><p>' + products[i].brand + '</p></div>' +
                '<div><p>' + 'RM' + products[i].price + '</p><p>' + 'Stock left: ' + products[i].stock + '</p></div>' +
                '<div><button type="button" class="btn btn-primary">' + 'Add to cart' + '</button></div>' +
                '<div><p>' + 'Product Description' + '</p><p>' + products[i].desc + '</p><p>' + products[i].extra-desc + '</p></div></div>'
            );
        }
    }
};