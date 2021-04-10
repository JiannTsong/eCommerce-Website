$(function() {

    //function push img info to cookies
    function setCookie(name, value, expire) {
        let d = new Date();
        d.setTime(d.getTime() + (expire * 24 * 60 * 60));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    //function to get imag from cookies
    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';'); //split the cookie part
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    var topProductID = [3, 7, 9];

    for (let i = 1; i <= topProductID.length; i++) {
        var vname = toString(i) + " Top-Product";

        setCookie(vname, topProductID[i], 7);
    }

    $.getJSON("assets/json/product_details.json", function() {

        //retrieve img from cookies to prsent as modal
        //show image of product
        for (let i = 1; i <= topProductID.length; i++) {
            vname = toString(i) + " Top-Product";

            pid = getCookie(vname);

            if (i == 1) {
                $("#topProduct").append(
                    '<div class="carousel-item active">' +
                    '<a href="product.html?id=' + pid + '">' +
                    '<img class="d-block w-100" src="' + product[pid].img[0] + '" alt="' + product[pid].name + '"></a></div> <div>The item is only RM ' + product[pid].price + '</div>'
                );
            } else if (i > 1) {
                $("#topProduct").append(
                    '<div class="carousel-item">' +
                    '<a href="product.html?id=' + pid + '">' +
                    '<img class="d-block w-100" src="' + product[pid].img[0] + '" alt="' + product[pid].name + '"></a></div>'
                );
            }
        }


    });

    $("span.top-close").click(function() {
        $("div#sidemodal").hide();
    });

    $("div#sidemodal").click(function(e) {
        if (e.target == this) {
            $("div#sidemodal").hide();
        }
    });

    $("div.top-modal-content > a").on("click", "img", function(e) {
        if (e.target == this) {
            $("div#sidemodal").hide();
        }
    });
});