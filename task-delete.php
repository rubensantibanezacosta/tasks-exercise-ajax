<?php

include("connect.php");
$conexion= ConnectDataBase();

if (isset($_POST["id"])) {
    $id=$_POST["id"];
    $description=$_POST["description"];
    $query="DELETE FROM tareas WHERE ID='$id'";
    $result=mysqli_query($conexion, $query);
    if(!$result){
        die("Query failed.");
    }
    echo "Task deleted successfully";
}


?>