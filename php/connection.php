<?php 
	class DB{
	  public function connect(){
	    $database = "pareto";
	    $user = "graphy";
	    $host = "https://osorniovelazquez.ml";
	    $pass = "graphy123";

	    $conn = new mysqli($host, $user, $pass, $database);
	    if ($conn->connect_errno > 0) {
	      echo $conn->error."</br>";
	    }
	    echo 1;
	    return $conn;
	  }
	}
 ?>