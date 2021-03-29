$(function(){
    $('input#customCheckLogin').change(
        function(){
            if ($(this).is(':checked')) {
                setCookie("autoCom", true, 365);
                $("form#login_form").attr("autocomplete", "on");
            }else{
                setCookie("autoCom", false, 365);
                $("form#login_form").attr("autocomplete", "off");
            }
    });

    if(getCookie("autoCom") == "true"){
        $("form#login_form").attr("autocomplete", "on");
        $('input#customCheckLogin').prop("checked", true);
    }else if(getCookie("autoCom") == "false"){
        $("form#login_form").attr("autocomplete", "off");
        $('input#customCheckLogin').prop("checked", false);
    }
});