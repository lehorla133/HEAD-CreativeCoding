<?php
// constantes
define('URLM', 'http://api.dirble.com/v2/countries/');
define('TOKEN','/stations?token=73250bb8449c64c5da029df11f');


// paramètres
$code = isset($_REQUEST['code']) ? $_REQUEST['code'] : 'SE';
// génération de la bonne url
$url = URLM.$code.TOKEN;

// requête au Web Service et affichage
header('content-type: text/json');
echo file_get_contents($url);




