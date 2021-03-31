$(function () {

    for (let i = 0; i < product.length; i++) {
        $("#product").append('<div class="card product">' +
            '<img src="' + product[i].img[0] + '" alt="' + product[i].name + '">' +
            '<div class="card-body">' +
            '<h5>' + product[i].name.substring(0, 25) + '</h5>' + ' RM' + product[i].price +
            '<p class="card-text">' + product[i].desc.substring(0, 105) + '...' + '</p>' +
            '<a href="' + './product.html?id=' + product[i].id + '" class="btn btn-info" target="_blank">View More</a>' +
            '</div></div>');
    }
});