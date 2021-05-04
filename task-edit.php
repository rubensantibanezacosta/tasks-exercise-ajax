<?php
include("connect.php");
$conexion= ConnectDataBase();

if (isset($_POST["name"])) {
    $name=$_POST["name"];
    $description=$_POST["description"];
    $id=$_POST["id"];
    $query="UPDATE tareas SET name='$name', description='$description' WHERE ID='$id'";
    $result=mysqli_query($conexion, $query);
    if(!$result){
        die("Query failed.");
    }
    echo "Task added successfully";
}


?>
