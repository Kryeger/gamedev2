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
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min.js"></script>
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
        
        <div class="modalOverlay">
            <div class="modalCustomCharacter modalWindow">
                <div class="mcc-top">
                    <div class="mcc-top-title">Character Customization</div>
                    <div class="mcc-top-close closeModalOv"><i class="material-icons">close</i></div>
                </div>
                <div class="mcc-cont">
                    <div class="mcc-picture" style="background-image: url(php/face.php);"></div>
                    <div class="mcc-options">
                        <div class="mcc-option-cont">
                            <div class="mcc-option-main">Facial Hair <i class="material-icons">add</i></div>
                            <div class="mcc-option">
                                <span>Facial Hair #1</span>
                                <div class="mcc-option-buy"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="topLevel">
            <div class="top-leftside">
                <div class="topLogo">gamedev<span class="version">0.0</span></div>
            </div>
            <div class="top-rightside clearfix">
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
                    asd
                </div>

            </div>
            
        </div>
	</body>

</html>