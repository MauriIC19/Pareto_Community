<?php
  require_once('connection.php');
  
  $conn = new DB();
  $conn = $conn->connect();

  $query = "SELECT * FROM Problema p, Sombrero s, Catuda c WHERE p.idSombrero = s.idSombrero AND p.idCatuda = c.idCatuda;";
  $results = $conn->query($query);

  $data = array();

  while ($row = $results->fetch_assoc()) {
    $data[] = $row;
  }

  for ($i = 0; $i < count($data); $i++){
    $query = "SELECT idFactor, nombreFactor, frecuencia FROM Factores WHERE idProblema = {$data[$i]['idProblema']};";
    $results = $conn->query($query);

    $factores = array();

    while($row = $results->fetch_assoc()){
      $factores[] = $row;
    }

    $data[$i]['factores'] = $factores;
  }

  echo json_encode($data);
?>