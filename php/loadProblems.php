<?php
  require_once('connection.php');
  
  $conn = new DB();
  $conn = $conn->connect();

  $query = "SELECT * FROM Problema";

  $results = $conn->query($query);

  $data = array();

  while ($row = $results->fetch_assoc()) {
    $data[] = $row;
  }

  echo json_encode($data);
?>