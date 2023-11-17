<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");
// header("Access-Control-Allow-Credentials: true");

$toEmail = "david@dtrust.io";
$mailHeaders = "From: " . $_POST["uname"] . "<". $_POST["userEmail"] .">\r\n";
$contents = 'Name: '.$_POST["uname"]."\r\n".'Email: '.$_POST["userEmail"]."\r\n".'Language: '. $_POST['language'];
if(mail($toEmail, "Form submission from DTrust", $contents, $mailHeaders)) {
    $response = array("status" => '200');
    echo json_encode($response);
// print "<p class='success'>Contact Mail Sent.</p>";
}
//  else {

// print "<p class='Error'>Problem in Sending Mail.</p>";
// }
?>