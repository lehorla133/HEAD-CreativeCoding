<?php
define('REALURL', 'https://api.flightstats.com/flex/schedules/rest/v1/json/from/GVA/departing/');
define('REALURLTOKEN', '?appId=589ee796&appKey=d8f0da6aa7f0e6c98e63a89206586460');

$airportDepart = isset($_REQUEST['airport']) ? $_REQUEST['airport'] : 'GVA';
$year = isset($_REQUEST['year']) ? $_REQUEST['year'] : '2016';
$month = isset($_REQUEST['month']) ? $_REQUEST['month'] : '12';
$day = isset($_REQUEST['day']) ? $_REQUEST['day'] : '1';
$hour = isset($_REQUEST['hour']) ? $_REQUEST['hour'] : '14';


$realurl = REALURL . $year . "/" . $month . "/" . $day . "/" . $hour . REALURLTOKEN;

header('content-type: text/json');
echo file_get_contents($realurl);



