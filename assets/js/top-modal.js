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
                c = c.substring(1); //move to next if the current position is space
            }
            if (c.indexOf(name) == 0) { //if current position match the string in name
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    $(document).ready(function() {

        var topProductID = [3, 7, 9];

        for (let i = 1; i <= topProductID.length; i++) {
            var vname = toString(i) + " Top-Product";

            setCookie(vname, topProductID[i]);
        }

        $.getJSON("assets/json/product_details.json", function() {

            for (let i = 1; i <= topProductID.length; i++) {

            }


        });

        //retrieve img from cookies to prsent as modal
        //show image of product

    })

});