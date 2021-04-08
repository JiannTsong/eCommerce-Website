$(function () {
    let aPI = "assets/json/product_details.json";
    $.getJSON(aPI)
                .done(function (data) {
                    let product = data;
                    for (let i = product.length - 1; i >= 0; i--) {
                        $("#product").append('<div class="card product" style="min-height:30rem;">' +
                            '<img src="' + product[i].img[0] + '" alt="' + product[i].name + '">' +
                            '<div class="card-body">' +
                            '<h6 class="class-title">' + product[i].name.substring(0, 35) + '</h6>' + ' RM ' + product[i].price +
                            '<p class="card-text">' + product[i].desc.substring(0, 100) + '...' + '</p>' +
                            '<a href="' + './product.html?id=' + product[i].id + '" class="btn btn-info">View More</a>' +
                            '</div></div>');
                    }
                });

});