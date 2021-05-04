<?php

function ConnectDataBase() 
		{
    // conectar con la base de datos
    $conexion = mysqli_connect(
            "localhost", 
            "root", 
            "");
    
    if (!($conexion)) 			{
        echo "There is an error connecting the server.";
        exit();
    }
    if (!mysqli_select_db($conexion, "tasks-app")) 			{
        echo "There is an error selecting the DB.";
        exit();
    }
    return $conexion;
		}
