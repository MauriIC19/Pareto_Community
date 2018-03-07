<?php 
  require_once('connection.php');
  
  $conn = new DB();
  $conn = $conn->connect();

  $nombreProblema = $_POST['nombreProblema'];
  $descripcion = $_POST['descripcion'];
  $factores = $_POST['factores'];
  $autor = $_POST['autor'];
  $factores = explode(',', $factores);

  $flagProblem = false;
  $flagFactors = false;

  $query = "INSERT INTO Problema (nombreProblema, descripcion, autor) VALUES('{$nombreProblema}', '{$descripcion}', '{$autor}');";

  $conn->begin_transaction();

  if ($conn->query($query)) {
  	$flagProblem = true;
  }

  $idProblema = $conn->insert_id;

  for ($i = 0; $i < count($factores); $i++) { 
  	$query = "INSERT INTO Factores (nombreFactor, idProblema) VALUES('{$factores[$i]}', {$idProblema})";
  	if ($conn->query($query)) {
  		$flagFactors = true;
  	}
  	else {
  		$flagFactors = false;
  		break;
  	}
  }

  if ($flagProblem && $flagFactors) {
  	$conn->commit();
  	echo 1;
  }
  else{
  	echo $conn->error;
  }
 ?>