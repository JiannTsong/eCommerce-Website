$(function() {
    function getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    let pid = getQueryString("id");


    let aPI = "assets/json/product_details.json";
    $.getJSON(aPI).done(function(product) {
        for (let i = 0; i < product.length; i++) {
            if (pid == (i + 1)) {
                $("head>title").text(product[i].name + " - Stygix Computer Shop");
                $("#product_title").append('<h4>' + product[i].name + '</h4>');
                $("#product_price").append('<h5>RM' + product[i].price + '</h5>');
                $('#stock_available').append('<h6>Stock Available ' + product[i].stock + '</h6>')
                $("#product_quantity").attr("max", product[i].stock);
                for (let j = 0; j < product[i].img.length; j++) {
                    if (j == 0) {
                        $("div#product_image > div.carousel-inner > div.carousel-item.active").append('<img class="d-block w-100" src="' + product[i].img[j] + '" alt="' + product[i].name + '">');
                    } else {
                        $("ol.carousel-indicators").append('<li data-target="#product_image" style="background-color: #000000;" data-slide-to="' + j + '"></li>');
                        $('div#product_image > div.carousel-inner').append('<div class="carousel-item"><img class="d-block w-100" src="' + product[i].img[j] + '" alt="' + product[i].name + '"></div>');
                    }
                }

                $("#addToCart").attr("data-product-id", pid);
                $("#addToWishlist").attr("data-product-id", pid);
                $("#short_description").append('<p>' + product[i].desc + '</p>');

                //Object.entries(product[i].extra_desc).forEach(([k, v], h) => console.log(h,k,v));
                for (let d = 0; d < Object.entries(product[i].extra_desc).length; d++) {
                    let dt = '<dt class="col-sm-3" style="margin-top:1rem;margin-bottom:1rem;">' + Object.entries(product[i].extra_desc)[d][0] + '</dt>';
                    $("dl.row").append(dt);

                    if (Object.entries(product[i].extra_desc)[d][1][0].length == 1) {
                        let dd = '<dd class="col-sm-9" style="margin-top:1rem;margin-bottom:1rem;">' + Object.entries(product[i].extra_desc)[d][1] + '</dd>';
                        $("dl.row").append(dd);
                    } else {
                        let ddc = '';
                        for (let n = 0; n < Object.entries(product[i].extra_desc)[d][1].length; n++) {
                            ddc = ddc + '<p>' + Object.entries(product[i].extra_desc)[d][1][n] + '</p>';
                        }
                        let dd = '<dd class="col-sm-9" style="margin-top:1rem;margin-bottom:1rem;">' + ddc + '</dd>';
                        $("dl.row").append(dd);
                    }

                }

            }
        }

        $("#minus_quantity").click(function() {
            let current = $("#product_quantity").val();
            if (current != 0) {
                $("#product_quantity").val(parseInt(current) - 1);
            }
        });

        $("#plus_quantity").click(function() {
            let current = $("#product_quantity").val();
            if (current < product[pid - 1].stock) {
                $("#product_quantity").val(parseInt(current) + 1);
            }
        });

    });



});