$(function(){
    $('input#customCheckLogin').change(
        function(){
            if ($(this).is(':checked')) {
                setCookie("rememberMe", true, 365);
                $("form#login_form").attr("autocomplete", "on");
            }else{
                setCookie("rememberMe", false, 365);
                $("form#login_form").attr("autocomplete", "off");
            }
    });

    if(getCookie("rememberMe") == "true"){
        $("form#login_form").attr("autocomplete", "on");
        $('input#customCheckLogin').prop("checked", true);
    }else if(getCookie("rememberMe") == "false"){
        $("form#login_form").attr("autocomplete", "off");
        $('input#customCheckLogin').prop("checked", false);
    }
});