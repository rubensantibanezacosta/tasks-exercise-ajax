<?php
include("connect.php");
$conexion= ConnectDataBase();

    

   $query="SELECT * FROM tareas";
   $result=mysqli_query($conexion, $query);
   if(!$result){
       die("Query error". mysqli_error($conexion));
   }
   $json= array();
   while ($row=mysqli_fetch_array($result)) {
       $json[]=array(
           'name'=>$row[1],
           'description'=>$row[2],
           'id'=>$row[0]
       );
   }
   $jsonstring=json_encode($json);
   echo $jsonstring;

?>