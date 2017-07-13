(function (window, $) {
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    function getAvt(Player){
        var avt = Player.avatar;
        var ret = "php/face.php";
        
        if(!Object.keys(avt).length){
            return ret;
        }else{
            var ret = "php/face.php";
            ret += "?g="+avt.gender+"&t="+avt.type+"&s="+avt.skin+"&e"+avt.eyes+"&n="+avt.nose+"&m="+avt.mouth+"&b="+avt.beard+"&bc="+avt.beardColor+"&h="+avt.hair+"&hc="+avt.hairColor;
            return ret;
        }
    }

    $(document).ready(function(){
        
        // cookies
        if(typeof $.cookie('leftsideOpen') !== 'undefined'){
            $(".leftside").addClass("expanded");
            $(".ls-toggler").find("i").text("keyboard_arrow_left");
        }
        
        // init
        $(".username").text(user.name);
        $(".usermoney").text(numberWithCommas(user.money));
        $(".useravatar").css("background-image", "url("+ getAvt(user) +")");
        $(".version").text(VERSION);
		$(".ls-mi-title").text(user.mainCompany.name);

        // interaction
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
        
        $(document).on("click", ".closeModalOv", function(){
            $(".modalOverlay").remove(); 
        });

    });

})(window, window.jQuery);