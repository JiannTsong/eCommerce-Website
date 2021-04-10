function setCookie(name, value, expire) {
    let d = new Date();
    d.setTime(d.getTime() + (expire * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');//split the cookie part
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);//move to next if the current position is space
        }
        if (c.indexOf(name) == 0) {//if current position match the string in name
            return c.substring(name.length, c.length);
        }
    }
    return "";
}