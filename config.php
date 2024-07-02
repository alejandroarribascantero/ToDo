<?php
// Configuración de la conexión a la base de datos
$servername = "sql7.freesqldatabase.com";
$username = "sql7717488";
$password = "V1fkc5durv";
$dbname = "sql7717488";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
