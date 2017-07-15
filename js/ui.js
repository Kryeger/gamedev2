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
    
    
    function refreshInfo(){
        $(".username").text(user.name);
        $(".usermoney").text(numberWithCommas(user.money));
        $(".useravatar").css("background-image", "url("+ getAvt(user) +")");
        $(".version").text(VERSION);
        $(".ls-mi-title").text(user.mainCompany.name);
        $(".mainCompanyName").text(user.mainCompany.name);
        $(".mainCompanyCapital").text(numberWithCommas(user.mainCompany.capital));
        $(".mainCompanyWorkersNum").text(numberWithCommas(Object.keys(user.mainCompany.workers).length));
        $(".mainCompanyReleasedGamesNum").text(numberWithCommas(Object.keys(user.mainCompany.releasedGames).length + Object.keys(user.mainCompany.archive).length));
        $(".mainCompanyFansNum").text(numberWithCommas(user.mainCompany.fans));
        $(".worldFormatedDate").text(world.formatedDate);
    }

    
    $(document).ready(function(){
        
        // cookies
        if(typeof $.cookie('leftsideOpen') !== 'undefined'){
            $(".leftside").addClass("expanded");
            $(".ls-toggler").find("i").text("keyboard_arrow_left");
        }
        
        // init
        refreshInfo();

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
        
        var textScroll;
        
        $(".textScrollWrap").hover(function(){
            var move = 5;
            var parent = $(this);
            if(parent.outerWidth() <= parseInt($(this).find("div").width())){
                console.log(parent.outerWidth());
            textScroll = setInterval(function(){
                var spanLeft = parseInt(parent.find("div").css("left"));
                parent.find("div").css("left", (spanLeft - move) +"px");
                if(-spanLeft >= parseInt(parent.find("div").width()) - parseInt(parent.width())) move = -5;
                else if(-spanLeft <= 0) move = 5;
            }, 100);
            }
        }, function(){
            clearInterval(textScroll);
            $(this).find("div").css("left", "0px");
        });
        
        $(document).on("click", ".trs-mainComp", function(){
            if(!$('.trs-allComps').length){
           $(this).addClass("tgld"); 
                var left = $(".trs-companyWrap").position().left;
            $("body").prepend(`
<div class="trs-allComps" style="left: `+left+`px;">
<div class="trs-allCompsTop"> Your companies </div>
<div class="trs-allCompsList">

</div>
<div class="trs-addNewComp">
<div class="trs-addNewCompButton">Found New Company</div>
</div>
</div>
`);
                if(Object.keys(user.companies).length > 0){
                    var compNum = Object.keys(user.companies).length;
                    for(var i = 0; i < compNum; i++){
                        $(".trs-allCompsList").append(`
<div class="trs-allCompsItem">
<div class="trs-aci-avt" style="background-image: url(http://i.imgur.com/Tz8ZXAe.png);"></div>
<div class="trs-aci-info">
<div class="trs-aci-name textScrollWrap"><div>`+user.companies[i].name+`</div>
</div>
<div class="trs-aci-details clearfix">
<div class="trs-aci-detail">Capital: $`+(numberWithCommas(user.companies[i].capital))+`</div>
<div class="trs-aci-detail">Workers: `+(numberWithCommas(Object.keys(user.companies[i].workers).length))+`</div>
<div class="trs-aci-detail">Released Games: `+(numberWithCommas(Object.keys(user.companies[i].archive).length + Object.keys(user.companies[i].releasedGames).length))+`</div>
<div class="trs-aci-detail">Fans: `+(numberWithCommas(user.companies[i].fans))+`</div>
</div>
</div>
</div>
`); 
                    }
                }
            }
        });
        
        $(document.body).on("click", ":not(.trs-allComps *, .trs-allComps)", function(e){
            if($(".trs-allComps").length){
                $(".trs-allComps").remove();
                $(".trs-mainComp").removeClass("tgld");
                e.stopPropagation();
                return false;
            }
        });
        
        $(document).on("click", ".trs-fwt-tab", function(){
           var tab = parseInt($(this).attr("data-tab"));
            $(".trs-fwt-tab").removeClass("selected");
            $(this).addClass("selected");
            $(".trs-fundsWarning").remove();
            if(tab == 0){ // add funds
                $(".trs-funds-sign").text("+");
                $(".trs-funds-sign").removeClass("red");
                $(".trs-funds-button").text("Add");
                $(".trs-funds-button").removeClass("red");
            }else if(tab == 1){
                $(".trs-funds-sign").text("-");
                $(".trs-funds-sign").addClass("red");
                $(".trs-funds-button").text("Withdraw");
                $(".trs-funds-button").addClass("red");
            }
        });
        
        $(document).on("click", ".trs-openFunds", function(){
           $(this).addClass("tgld");
            var left = $(this).offset().left;
            if(!$(".trs-fundsWrap").length){
            $("body").prepend(`
<div class="trs-fundsWrap" style="left: `+left+`px;">
<div class="trs-fundsWrapTop">
<div class="trs-fwt-name">Capital</div>
<div class="trs-fwt-tabs">
<div class="trs-fwt-tab selected" data-tab="0">Add funds</div>
<div class="trs-fwt-tab" data-tab="1">Withdraw</div>
</div>
</div>

<div class="trs-fundsCont">
<div class="trs-funds-sign">+</div>
<label>$</label>
<input class="trs-funds-input" type="number">
</div>

<div class="trs-funds-buttonWrap">
<div class="trs-funds-button">Add</div>
</div>
</div>
`);
            }
        });
        
        $(document.body).on("click", ":not(.trs-fundsWrap, .trs-fundsWrap *)", function(e){
           if($(".trs-fundsWrap").length){
               e.stopPropagation();
               $(".trs-fundsWrap").remove();
               $(".trs-openFunds").removeClass("tgld");
           } 
        });
        
        $(document).on("click", ".trs-funds-button", function(){
            var tab = parseInt($(".trs-fwt-tab.selected").attr("data-tab")); 
            var canDo = 1;
            var sum = parseFloat($(".trs-funds-input").val());
            $(".trs-fundsWarning").remove();
            if(!$.isNumeric(sum)){
                $canDo = 0;
                $(".trs-funds-buttonWrap").before(`
<div class="trs-fundsWarning">
You must enter a number
</div>
`);
            }
            if(canDo){
                
                if(tab == 0){ // add funds
                    if(sum > user.money){
                        $(".trs-funds-buttonWrap").before(`
<div class="trs-fundsWarning">
Insufficient funds
</div>
`);
                    }else{
                        user.money -= sum;
                        user.mainCompany.capital += sum;
                    }
                }else{ // withdraw funds
                    if(sum > user.mainCompany.capital){
                        $(".trs-funds-buttonWrap").before(`
<div class="trs-fundsWarning">
Insufficient funds
</div>
`);
                    }else{
                        user.money += sum;
                        user.mainCompany.capital -= sum;
                    }
                }
                
                refreshInfo();
                
            }
        });
        
        $(document).on("click", ".fc-bottom-sign-button", function(){
            var companyName = $("input[name=compName]").val();
            var companyCap = parseFloat($("input[name=compCap]").val());
            var canDo = 1;
            
            $(".fc-warn").remove();
            $(".fc-marking").remove();
            
            if(!$.isNumeric(companyCap)){
                canDo = 0;
                var top = $("input[name=compCap]").offset().top - 68;
                $(".founding-contract").prepend(`<div class="fc-marking" style="top: `+top+`px;"></div>`);
                $(".fc-cont").after(`<div class="fc-warn">The Capital must be a number</div>`);
            }

            if($.isNumeric(companyCap) && companyCap > user.money){
                canDo = 0;
                var top = $("input[name=compCap]").offset().top - 68;
                $(".founding-contract").prepend(`<div class="fc-marking" style="top: `+top+`px;"></div>`);
                $(".fc-cont").after(`<div class="fc-warn">Insufficient Funds</div>`);
            }

            if($.trim(companyName) == ''){
                canDo = 0;
                var top = $("input[name=compName]").offset().top - 68;
                $(".founding-contract").prepend(`<div class="fc-marking" style="top: `+top+`px;"></div>`);
                $(".fc-cont").after(`<div class="fc-warn">You must enter a name for the Company</div>`);
            }
            
            if(canDo){
                $(this).remove();
                $(".fc-bottom-sign-button-cancel").remove();
                var signAngle = chance.integer({min: -10, max: 10});
                var stampAngle = chance.integer({min: 0, max: 359});
                $(".fc-bottom-signature").append(`
<div class="fc-bs-signature username" style="transform: rotate(`+signAngle+`deg);">`+user.name+`</div>
<div class="fc-bs-stamp" style="transform: rotate(`+stampAngle+`deg);"></div>
`);
                user.money -= companyCap;
                user.createCompany(companyName, companyCap);
                world.isPaused = 0;
                refreshInfo();
                setTimeout(function(){
                    $(".modalOverlay").remove();
                }, 2000);
            }
        });
        
        $(document).on("click", ".trs-addNewCompButton", function(){
           
            if(!$(".modalOverlay").length){
                world.isPaused = 1;
            $("body").prepend(`
<div class="modalOverlay">
<div class="founding-contract">
<div class="founding-contract-title">Bill of Property</div>
<div class="fc-topDetails">
<div class="fc-topDetail">
<div class="fc-td-left">Name</div>
<div class="fc-td-right username">`+user.name+`</div>
</div>
<div class="fc-topDetail">
<div class="fc-td-left">Company Name</div>
<input class="fc-td-right username" type="text" name="compName">
</div>
<div class="fc-topDetail">
<div class="fc-td-left">Capital</div>
<label>$</label>
<input class="fc-td-right username" type="number" name="compCap">
</div>
</div>
<div class="fc-cont">
Capicola pork shoulder drumstick, pork turducken tip kielbasa. Mignon ham ham 
belly biltong, hamburger round ham tri-tip braunschweiger. Drumstick strip 
leberkas landjaeger tip beef braunschweiger tenderloin pork sausage, pork 
sirloin frankfurter ham turkey ham ham boudin brisket. Turducken jerky bacon ham 
pork. Ribs turducken fatback, strip prosciutto turducken ham shankle ham chuck 
andouille
</div>
<div class="fc-bottom">
<div class="fc-bottom-date">
<div class="fc-bottom-date-title">Date</div>
<div class="fc-bottom-date-date worldFormatedDate">`+world.formatedDate+`</div>
</div>

<div class="fc-bottom-signature">
<div class="fc-bottom-sign-title">Signature</div>
<div class="fc-bottom-sign-button-cancel">Cancel</div>
<div class="fc-bottom-sign-button">Sign here</div>
</div>
</div>
</div>
</div>
`);
            }
        });
        
        $(document).on("click", ".fc-bottom-sign-button-cancel", function(){
           $(".modalOverlay").remove();
            world.isPaused = 0;
        });

    });

})(window, window.jQuery);