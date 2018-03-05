<?php 
	class DB{
	  public function connect(){
	    $database = "pareto";
	    $host = "osorniovelazquez.ml";
	    $user = "graphy";
	    $pass = "graphy123";

	    $conn = new mysqli($host, $user, $pass, $database);
	    if ($conn->connect_errno > 0) {
	      echo $conn->error."</br>";
	    }
	    return $conn;
	  }
	}
 ?>