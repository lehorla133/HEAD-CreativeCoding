<?php
// constantes


define('URLM', 'https://api.flightstats.com/flex/airports/rest/v1/json/fs/');
define('TOKEN', '?appId=589ee796&appKey=d8f0da6aa7f0e6c98e63a89206586460');


// paramètres
$code = isset($_REQUEST['ville']) ? $_REQUEST['ville'] : 'ZRH';
// génération de la bonne url
$url = URLM . $code . TOKEN;

// requête au Web Service et affichage
header('content-type: text/json');
echo file_get_contents($url);




