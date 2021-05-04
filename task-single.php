<?php

include("connect.php");
$conexion = ConnectDataBase();


$id = $_POST["id"];
$query = "SELECT * FROM tareas WHERE ID='$id'";
$result = mysqli_query($conexion, $query);
if (!$result) {
    die("Query failed.");
}
$json = array();
while ($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'name' => $row[1],
        'description' => $row[2],
        'id' => $row[0]
    );
}
$jsonstring = json_encode($json[0]);
echo $jsonstring;


