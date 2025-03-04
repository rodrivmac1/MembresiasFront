<?php

function curl_api($url,$metodo,$datos){
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
    CURLOPT_POSTFIELDS      => $datos,
  ));
  $response = curl_exec($curl);
  curl_close($curl);
  return $response;
}

$nombre = $_POST["nombre"];
$apellidos = $_POST["apellidos"];
$genero = $_POST["genero"];
$email = $_POST["email"];
$password = $_POST["password"];
$universidad = $_POST["universidad"];
$li = $_POST["li"];
$estado = $_POST["estado"];
$pais = $_POST["pais"];

$data = array(
        "nombre" => $nombre,
        "apellidos" => $apellidos,
        "genero" => $genero,
        "email" => $email,
        "password" => $password,
        "universidad" => $universidad,
        "li" => $li,
        "estado" => $estado,
        "pais" => $pais
        );
        
$data = json_encode($data);
$response = curl_api('https://lumacad.com.mx/membresias/backend/servicio/perfil_usuario/','PATCH',$data);
echo($response);

?>
