<?php

// Conexion a BD
function conex()
{
    $servername = "localhost";
    $username = "lumacadc_membresias_usuario";
    $password = "ik}!HPq8}XHn";
    $dbname = "lumacadc_membresias_redmis";
    $mysqli = new mysqli($servername, $username, $password,$dbname);
    if($mysqli->connect_error){
      die("Connection failed: " . $mysqli->connect_error);
    }
    $mysqli->set_charset("utf8");
    return $mysqli;
}

function getPaises(){
  $mysqli   = conex();
  $result=mysqli_query($mysqli, "SELECT * FROM LineasInvestigacion ");
  $row = mysqli_fetch_array($result);
  $fin=mysqli_num_rows($result);

  
}