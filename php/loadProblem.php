<?php
  require_once('connection.php');

  $conn = new DB();
  $conn = $conn->connect();

  $idProblema = (int)$_GET['idProblem'];

  $query = "SELECT * FROM Problema p, Sombrero s, Catuda c WHERE p.idProblema = {$idProblema} AND p.idSombrero = s.idSombrero AND p.idCatuda = c.idCatuda;";
  $results = $conn->query($query);

  $data = array();
  $row = $results->fetch_assoc();
  $data = $row;

  $query = "SELECT idFactor, nombreFactor, frecuencia FROM Factores WHERE idProblema = {$idProblema};";
  $results = $conn->query($query);

  $factores = array();
  while($row = $results->fetch_assoc()){
    $factores[] = $row;
  }
  $data['factores'] = $factores;

  echo json_encode($data);
?>