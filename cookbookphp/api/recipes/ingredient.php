<?php

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://localhost/cookbook/api/ingredient/read.php");
curl_setopt($ch, CURLOPT_HEADER, 0);


$data=curl_exec($ch);
curl_close($ch);


return $data;
