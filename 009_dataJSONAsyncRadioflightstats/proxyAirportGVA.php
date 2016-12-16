<?php
define('URLM', 'http://gva.atipik.ch/api2/flights');
header('content-type: text/json');
echo file_get_contents(URLM);




