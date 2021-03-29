function setCookie(name, value, expire) {
    var d = new Date();
    d.setTime(d.getTime() + (expire * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');//split the cookie part
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);//move to next if the current position is space
        }
        if (c.indexOf(name) == 0) {//if current position match the string in name
            return c.substring(name.length, c.length);
        }
    }
    return "";
}