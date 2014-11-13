<?php

	session_start();
	include_once $_SERVER['DOCUMENT_ROOT'] . '/email/securimage.php';
	$securimage = new Securimage();
	if ($securimage->check($_POST['captcha_code']) == false) {
		echo "CAPTCHA";
		exit;
	}

    $name = $_POST['name'];
	$email = $_POST['email'];
	$query = $_POST['message'];
	$email_from = $name.'<'.$email.'>';
	$subject = $_POST['subject'];
	if (empty($subject)){
		$subject = "Message sent from the website";
	}

 $f_id=fopen('./mail.address','r');
 $to=fgets($f_id,100);
 fclose($f_id);
 
 $headers  = 'MIME-Version: 1.0' . "\r\n";
 $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 $headers .= "From: web_contact@mokap.es\r\n";
 $message="	  
 	   
	    The next message has been received from the contact form at http://www.mokap.es/#contactus</br>
		El siguiente mensaje ha sido recibido a trav&eacute;s de la web de mokap (formulario de contacto)</br>
		<br/>
 		 <h2>Name/<i>Nombre</i>:</h2>
		 $name 	   
         <br/><br/>
 		 <h2>Email:</h2>
		 $email 	   
         <br/><br/>
 		 <h2>Message/<i>Mensaje</i>:</h2><br/>
		 $query 	   
      
   ";
	if(mail($to,$subject,$message,$headers))
		echo "OK";
	else
		echo "FAILURE";

?>
