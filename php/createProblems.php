<?php 
  require_once('connection.php');
  
  $conn = new DB();
  $conn = $conn->connect();

  $nombreProblema = $_POST['nombreProblema'];
  $descripcion = $_POST['descripcion'];
  $factores = $_POST['factores'];
  $autor = $_POST['autor'];
  $factores = explode(',', $factores);
  $hat = (int)$_POST['hat'];

  $query = "INSERT INTO Problema (nombreProblema, descripcion, autor, idSombrero) VALUES('{$nombreProblema}', '{$descripcion}', '{$autor}', {$hat});";

  $conn->begin_transaction();

  $conn->query($query);

  $idProblema = $conn->insert_id;

  for ($i = 0; $i < count($factores); $i++) { 
  	$query = "INSERT INTO Factores (nombreFactor, idProblema) VALUES('{$factores[$i]}', {$idProblema})";
  	$conn->query($query);
  }

  if($conn->commit()){
  	echo 1;
  }
  else{
  	echo $conn->error;
  }
 ?>