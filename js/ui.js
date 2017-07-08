(function (window, $) {

    $(document).ready(function(){
        
        if(typeof $.cookie('leftsideOpen') !== 'undefined'){
            $(".leftside").addClass("expanded");
            $(".ls-toggler").find("i").text("keyboard_arrow_left");
        }

        $(document).on("click", ".ls-toggler", function(){
            $(".leftside").toggleClass("expanded");
            if($(".leftside").hasClass("expanded")){
                $(this).find("i").text("keyboard_arrow_left");
                $.cookie('leftsideOpen', true, { expires: 30, path: '/' });
            }else{
                $(this).find("i").text("keyboard_arrow_right");
                $.removeCookie('leftsideOpen', { expires: 30, path: '/' });
            }
        });

    });

})(window, window.jQuery);