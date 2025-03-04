<?php

function curl_api($url,$metodo){
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL             => $url,
    CURLOPT_RETURNTRANSFER  => true,
    CURLOPT_ENCODING        => '',
    CURLOPT_MAXREDIRS       => 10,
    CURLOPT_TIMEOUT         => 0,
    CURLOPT_FOLLOWLOCATION  => true,
    CURLOPT_HTTP_VERSION    => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST   => $metodo,
  ));
  $response = curl_exec($curl);
  curl_close($curl);
  return $response;
}

$response = curl_api('https://lumacad.com.mx/membresias/backend/servicio/administrador/','GET');
echo($response);

?>