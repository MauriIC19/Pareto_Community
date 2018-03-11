<?php 
  require_once('connection.php');
  
  $conn = new DB();
  $conn = $conn->connect();

  $voteFactors = $_POST['voteFactors'];
  $voteFactors = explode(',', $voteFactors);

  for ($i = 0; $i < count($voteFactors); $i++) { 
  	$idFactor = (int)$voteFactors[$i];
  	$query = "UPDATE Factores SET frecuencia = frecuencia + 1 WHERE idFactor = {$idFactor};";

  	if ($conn->query($query)) {
  		$msg = "1";
  	}
  	else {
  		$msg = $conn->error;
  	}
  }

  echo $msg;

 ?>