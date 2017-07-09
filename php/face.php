<?php

include_once("func.php");

$options = array(  // gender -> type -> elements
    0 => array(
        0 => array(
            'skin' => 5,
            'eyes' => 4,
            'nose' => 4,
            'mouth' => 4,
            'beard' => array(
                0 => 0,
                1 => 1,
                2 => 1,
                3 => 1,
                4 => 1
            ),
            'hair' => array(
                0 => 0,
                1 => 1,
                2 => 1,
                3 => 1,
                4 => 1
            )
        )
    )
);

//gender  0 - male | 1 - female
if(isset($_GET['g']) && !empty($_GET['g'])){
    $gender = $_GET['g'];
    if($gender > sizeof($options) || $gender < 0) $gender = 0;
}else{
    $gender = 0;
}

//type
if(isset($_GET['t']) && !empty($_GET['t'])){
    $type = $_GET['t'];
    if($type > sizeof($options[$gender]) || $type < 0) $type = 0;
}else{
    $type = 0;
}

//skin
if(isset($_GET['s']) && !empty($_GET['s'])){
    $skin = $_GET['s'];
    if($skin >= $options[$gender][$type]['skin'] || $skin < 0) $skin = 0;
}else{
    $skin = 0;
}

//eyes
if(isset($_GET['e']) && !empty($_GET['e'])){
    $eyes = $_GET['e'];
    if($eyes >= $options[$gender][$type]['eyes'] || $eyes < 0) $eyes = 0;
}else{
    $eyes = 0;
}

//nose
if(isset($_GET['n']) && !empty($_GET['n'])){
    $nose = $_GET['n'];
    if($nose >= $options[$gender][$type]['nose'] || $nose < 0) $nose = 0;
}else{
    $nose = 0;
}

//mouth
if(isset($_GET['m']) && !empty($_GET['m'])){
    $mouth = $_GET['m'];
    if($mouth >= $options[$gender][$type]['mouth'] || $mouth < 0) $mouth = 0;
}else{
    $mouth = 0;
}

//beard
if(isset($_GET['b']) && !empty($_GET['b'])){
    $beard = $_GET['b'];
    if($beard >= $options[$gender][$type]['beard'] || $beard < 0) $beard = 0;
}else{
    $beard = 0;
}

//beard color
if(isset($_GET['bc']) && !empty($_GET['bc'])){
    $beardColor = $_GET['bc'];
    if($beardColor >= $options[$gender][$type]['beard'][$beard] || $beardColor < 0) $beardColor = 0;
}else{
    $beardColor = 0;
}

//hair
if(isset($_GET['h']) && !empty($_GET['h'])){
    $hair = $_GET['h'];
    if($hair >= $options[$gender][$type]['hair'] || $hair < 0) $hair = 0;
}else{
    $hair = 0;
}


//hair color
if(isset($_GET['hc']) && !empty($_GET['hc'])){
    $hairColor = $_GET['hc'];
    if($hairColor >= $options[$gender][$type]['hair'][$hair] || $hairColor < 0) $hairColor = 0;
}else{
    $hairColor = 0;
}

$skinImg = '../res/faces/'.$gender.'/'.$type.'/skin/skin'.$skin.'.png';
$eyesImg = '../res/faces/'.$gender.'/'.$type.'/eyes/eyes'.$eyes.'.png';
$noseImg = '../res/faces/'.$gender.'/'.$type.'/nose/nose'.$nose.'.png';
$mouthImg = '../res/faces/'.$gender.'/'.$type.'/mouth/mouth'.$mouth.'.png';
$beardImg = '../res/faces/'.$gender.'/'.$type.'/beard/beard'.$beard.'c'.$beardColor.'.png';
$hairImg = '../res/faces/'.$gender.'/'.$type.'/hair/hair'.$hair.'c'.$hairColor.'.png';

$images = array($skinImg, $eyesImg, $noseImg, $mouthImg, $beardImg, $hairImg);

// Allocate new image
$img = imagecreatetruecolor(200, 200);
// Make alpha channels work
imagesavealpha($img, true);

$trans_colour = imagecolorallocatealpha($img, 0, 0, 0, 127);
imagefill($img, 0, 0, $trans_colour);
imagealphablending($img, true);
imagesavealpha($img, true);

foreach($images as $fn) {
    // Load image
    $cur = imagecreatefrompng($fn);
    imagealphablending($cur, true);
    imagesavealpha($cur, true);

    // Copy over image
    imagecopy($img, $cur, 0, 0, 0, 0, 200, 200);

    // Free memory
    imagedestroy($cur);
}   

header('Content-Type: image/png');  // Comment out this line to see PHP errors
imagepng($img);

?>