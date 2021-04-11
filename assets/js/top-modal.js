$(function() {

    //function push info to cookies
    function setCookie(name, value, expire) {
        let d = new Date();
        d.setTime(d.getTime() + (expire * 24 * 60 * 60));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    //function to get hide result from cookies
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

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    $.getJSON("assets/json/product_details.json").done(function(product_data) {

        if (isMobile.any() === null) {
            if ((getCookie("hide-banner") === false || getCookie("hide-banner") === null || getCookie("hide-banner") === "")) {
                var topProductID = [3, 7, 9];

                //retrieve img from cookies to prsent as modal
                //show image of product
                let count_carousel = 1;
                for (let j = 0; j < topProductID.length; j++) {

                    pid = topProductID[j];
                    $("#sidemodal").show();

                    for (let i = 0; i < product_data.length; i++) {

                        if (product_data[i].id == topProductID[j]) {

                            if (count_carousel == 1) {
                                count_carousel++;
                                console.log("First" + product_data[i].img[0]);
                                $("body>div.sidemodal").show();
                                $("div#topProduct").prepend(
                                    '<div class="carousel-item active">' +
                                    '<a href="product.html?id=' + (i + 1) + '">' +
                                    '<img class="d-block w-100" src="' + product_data[i].img[0] + '" alt="' + product_data[i].name + '" style="height: 350px"></a></div>'
                                );
                            } else {
                                count_carousel++;
                                console.log("Not first" + product_data[i].img[0]);
                                $("#topProduct").prepend(
                                    '<div class="carousel-item">' +
                                    '<a href="product.html?id=' + (i + 1) + '">' +
                                    '<img class="d-block w-100" id="imgsize2" src="' + product_data[i].img[0] + '" alt="' + product_data[i].name + '" style="height: 350px"></a></div>'
                                );
                            }
                        }
                    }
                }
            } else if (getCookie("hide-banner") === true)
                $("body>div.sidemodal").hide();
        } else
            $("body>div.sidemodal").hide();
    });

    $("span.top-close").click(function() {
        $("div#sidemodal").hide();
        setCookie("hide-banner", true, 1);
    });

    $("div#sidemodal").click(function(e) {
        if (e.target == this) {
            $("div#sidemodal").hide();
            setCookie("hide-banner", true, 1);
        }
    });

    $("div.top-modal-content > a").on("click", "img", function(e) {
        if (e.target == this) {
            $("div#sidemodal").hide();
            setCookie("hide-banner", true, 1);
        }
    });
});