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

$email = $_POST["email"];
$estatus = $_POST["estatus"];
$rutaPdf = $_POST["rutaPdf"];
$membresia = $_FILES["membresia"]['name'];
$membresia_tmp = $_FILES['membresia']['tmp_name'];



move_uploaded_file($membresia_tmp,"../membresiasPDF/".$membresia);


  
$data = array(
    "email" => $email,
    "estatus" => $estatus,
    "rutaPdf" => $rutaPdf,
    "nomMembresia" => $membresia
    );
    
    $data = json_encode($data);
    
    
    
    

////////////////////////////////////START OF SEND MAIL//////////////////////////////////////////////////

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    //$mail->SMTPDebug = 1;                                       //Enable verbose debug output SMTP::DEBUG_SERVER
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'mail.lumacad.com.mx';                  //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'membresias-noreplay@lumacad.com.mx';              //SMTP username
    $mail->Password   = 'dE6-(ux3cDi&';                       //SMTP password
    $mail->SMTPSecure = 'ssl';                                  //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('membresias-noreplay@lumacad.com.mx', 'REDMIS');
    $mail->addAddress($email, 'Person');   //Add a recipient
    // $mail->addAddress('ellen@example.com');                          //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    $mail->addAttachment($rutaPdf);        //Add attachments
    // $mail->addAttachment("../membresiasPDF/Membresia_Javier Real Jaimes.pdf");
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Membresia REDMIS';
    $mail->Body    = '
    Estimado [Nombre del Aspirante],
    ¡Es un placer darte la más cordial bienvenida a la Red Temática Mexicana de Ingeniería de Software! Nos complace informarte que has sido aceptado como miembro de nuestra comunidad, después de una cuidadosa revisión de tu CV sometido a nuestro sistema.
    Felicitaciones por ser seleccionado para unirte a una red apasionada y comprometida de profesionales de la ingeniería de software. Tu experiencia y conocimientos son valiosos para nuestra comunidad y estamos emocionados de contar contigo.
    Como miembro de nuestra Red Temática, tendrás la oportunidad de:
        Conectar con otros profesionales de la industria de la ingeniería de software en todo México.
        Participar en eventos, seminarios web y conferencias exclusivas.
        Compartir tus conocimientos y experiencias a través de publicaciones y presentaciones.
        Mantenerte actualizado sobre las últimas tendencias y avances en la ingeniería de software.
        Te invitamos a aprovechar al máximo esta oportunidad para ampliar tu red profesional y contribuir al crecimiento y desarrollo de la comunidad. Esperamos verte activo en nuestras plataformas en línea y en nuestros eventos presenciales.
        
        Por favor, mantén tu información de perfil actualizada para que podamos proporcionarte información relevante y asegurarnos de que estés al tanto de las oportunidades que tenemos para ofrecerte.
        
        Una vez más, felicitaciones y bienvenido a la Red Temática Mexicana de Ingeniería de Software. ¡Esperamos tener una colaboración fructífera y enriquecedora juntos!
        
        Saludos cordiales,
        
        Reyes Juárez- Ramírez
        Presidente
        Red Temática Mexicana de Ingeniería de Software
        reyesjua@uabc.edu.mx
        https://conisoft.org/redmis/
    ';
    // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    
    
    $response = curl_api('https://lumacad.com.mx/membresias/backend/servicio/estatusSolicitud/','PATCH',$data);
    // echo($membresia);
    // echo($membresia_tmp);
    echo($response);
    
} catch (Exception $e) {
    // print_r($data);
    echo '{
            "respuesta" : "Error a causa de; correo electronico, datos de usuario",
            "error" : true
          }';
}

////////////////////////////////////END OF SEND MAIL//////////////////////////////////////////////////

?>