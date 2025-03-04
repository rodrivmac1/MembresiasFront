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

$name = $_POST["name"];    
$lastName = $_POST["lastName"];    
$genero = $_POST["genero"];    
$email = $_POST["email"];    
$password = $_POST["password"];
$universidad = $_POST["universidad"];
$lineaInv = $_POST["lineaInv"];
$pais = $_POST["pais"];
$estado = $_POST["estado"];
$tipoM = $_POST["tipoM"];
$fotoPerfil = $_FILES["fotoPerfil"]['name'];
$fotoPerfil_tmp = $_FILES['fotoPerfil']['tmp_name'];
$cv = $_FILES["cv"]['name'];
$cv_tmp = $_FILES['cv']['tmp_name'];

move_uploaded_file($fotoPerfil_tmp,"../imgUsers/".$fotoPerfil);
move_uploaded_file($cv_tmp,"../pdf/".$cv);

$data = array(
        "name" => $name,
        "lastName" => $lastName,
        "genero" => $genero,
        "email" => $email,
        "password" => $password,
        "universidad" => intval($universidad),
        "lineaInv" => intval($lineaInv),
        "pais" => intval($pais),
        "estado" => intval($estado),
        "tipoM" => $tipoM,
        "fotoPerfil" => $fotoPerfil,
        "cv" => $cv,
        );
        
// var_dump($data);

$data = json_encode($data);
$response = curl_api('https://lumacad.com.mx/membresias/backend/servicio/registro/','POST',$data);
echo($response);

?>
