$(function () {
    let product = "./product.json";

    $.getJSON(product).done(function (data) {
        for (let i = 0; i < data.product.length; i++) {
            $("#product").append('<div class="card product">' +
                '<img src="' + data.product[i].img[0] + '" alt="' + data.product[i].name + '">' +
                '<div class="card-body">' +
                '<h5>' + data.product[i].name + '</h5>' + ' RM' + data.product[i].price +
                '<p class="card-text">' + data.product[i].desc.substring(0, 105) + '...' + '</p>' +
                '<a href="' + '/product.html?id=' + i + '" class="btn btn-primary" target="_blank">View More</a>' +
                '</div></div>');
        }
    });
});