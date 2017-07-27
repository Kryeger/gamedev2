<?php
include_once("php/func.php");
?>
<!DOCTYPE html>

<html>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>GameDev 2</title>
		<meta name="description" content="  ">
        <meta name="theme-color" content="#121317">
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="css/style.css">
		<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500,500italic,400italic,300italic' rel='stylesheet' type='text/css'>
        <link href="https://fonts.googleapis.com/css?family=Inconsolata:400,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jStorage/0.4.12/jstorage.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/2.5.0/math.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/taffydb/2.7.2/taffy-min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chance/1.0.3/chance.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sugar/2.0.4/sugar.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/datejs/1.0/date.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
        <script type="text/javascript" src="js/func.js"></script>
        <script type="text/javascript" src="js/ui.js"></script>
	</head>

    <body>
        
        
        <!-- 
        <div class="trs-fundsWrap">
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
                <input class="trs-funds-input">
            </div>
            <div class="trs-fundsWarning">
                Insufficient funds
            </div>
            <div class="trs-funds-buttonWrap">
                <div class="trs-funds-button">Add</div>
            </div>
        </div>
        -->
        <!--
        <div class="modalOverlay">
            <div class="founding-contract">
                <div class="founding-contract-title">Bill of Property</div>
                <div class="fc-topDetails">
                    <div class="fc-topDetail">
                        <div class="fc-td-left">Name</div>
                        <div class="fc-td-right username"></div>
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
                        <div class="fc-bottom-date-date worldFormatedDate"></div>
                    </div>
                    
                    <div class="fc-bottom-signature">
                        <div class="fc-bottom-sign-title">Signature</div>
                        <div class="fc-bottom-sign-button-cancel">Cancel</div>
                        <div class="fc-bottom-sign-button">Sign here</div>
                    </div>
                </div>
            </div>
        </div>
        -->
        
        <div class="topLevel">
            <div class="top-leftside">
                <div class="topLogo">gamedev<span class="version">0.0</span></div>
            </div>
            <div class="top-rightside clearfix">
                <div class="trs-companyWrap">
                    <div class="trs-companyAvt" style="background-image: url(http://i.imgur.com/Tz8ZXAe.png);"></div>
                    <div class="trs-mainComp noSelect">
                        <div class="trs-companyName textScrollWrap scrollingTextParent">
                            <div class="mainCompanyName scrollingText"></div>
                    </div>
                        <i class="material-icons trs-toggleCompaniesList">arrow_drop_down</i>
                    </div>
                    <div class="trs-companyItem trs-openFunds">
                        <i class="material-icons">account_balance</i>
                        $<span class="mainCompanyCapital"></span>
                    </div>

                    <div class="trs-companyItem">
                        <i class="material-icons">people</i>
                        <span class="mainCompanyWorkersNum"></span>
                    </div>
                    
                    <div class="trs-companyItem">
                        <i class="material-icons">burst_mode</i>
                        <span class="mainCompanyReleasedGamesNum"></span>
                    </div>

                    <div class="trs-companyItem">
                        <i class="material-icons">face</i>
                        <span class="mainCompanyFansNum"></span>
                    </div>
                </div>
                <div class="trs-money">$<span class="usermoney"></span></div>
                <div class="trs-name username"></div>
                <div class="trs-avt useravatar"></div>
            </div>
        </div>
        
        <div class="bodyWrap">       

            <div class="leftside">
                <?php leftside(); ?>
            </div>

            <div class="mainContent">

                <div class="mainWrap">
                    
                    <div class="companyPageWrap">
                        
                        <div class="cp-top">
                            <div class="cp-avt-name-date">
                                <div class="cp-avt" style="background-image: url(http://i.imgur.com/Tz8ZXAe.png);"></div>
                                <div class="cp-name-date">
                                    <div class="cp-name mainCompanyName"></div>
                                    <div class="cp-foundingDate">Since <span class="mainCompanyFoundingDate"></span></div>
                                </div>
                            </div>
                            
                            <div class="cp-detailsWrap clearfix">
                                <div class="cp-detail cpd-capital">
                                    <div class="cp-detail-icon-wrap">
                                        <div class="cp-detail-icon-back"></div>
                                        <i class="material-icons cp-detail-icon-i">account_balance</i>
                                    </div>
                                    <div class="cp-detail-texts">
                                        <div class="cp-detail-texts-top">$<span class="mainCompanyCapital"></span></div>
                                        <div class="cp-detail-texts-bottom">Capital</div>
                                    </div>
                                </div>

                                <div class="cp-detail cpd-workers">
                                    <div class="cp-detail-icon-wrap">
                                        <div class="cp-detail-icon-back"></div>
                                        <i class="material-icons cp-detail-icon-i">people</i>
                                    </div>
                                    <div class="cp-detail-texts">
                                        <div class="cp-detail-texts-top"><span class="mainCompanyWorkersNum"></span></div>
                                        <div class="cp-detail-texts-bottom">Workers</div>
                                    </div>
                                </div>

                                <div class="cp-detail cpd-games">
                                    <div class="cp-detail-icon-wrap">
                                        <div class="cp-detail-icon-back"></div>
                                        <i class="material-icons cp-detail-icon-i">burst_mode</i>
                                    </div>
                                    <div class="cp-detail-texts">
                                        <div class="cp-detail-texts-top"><span class="mainCompanyReleasedGamesNum"></span></div>
                                        <div class="cp-detail-texts-bottom">Released Games</div>
                                    </div>
                                </div>

                                <div class="cp-detail cpd-fans">
                                    <div class="cp-detail-icon-wrap">
                                        <div class="cp-detail-icon-back"></div>
                                        <i class="material-icons cp-detail-icon-i">face</i>
                                    </div>
                                    <div class="cp-detail-texts">
                                        <div class="cp-detail-texts-top"><span class="mainCompanyFansNum"></span></div>
                                        <div class="cp-detail-texts-bottom">Fans</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

            </div>
            
        </div>
	</body>

</html>