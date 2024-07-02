<?php
// consultas.php

// Incluir archivo de configuración de la base de datos
include 'config.php';

// Verificar si se recibe el parámetro action
if (isset($_GET['action'])) {
    $action = $_GET['action'];

    // Ejecutar la función correspondiente según el valor de action
    switch ($action) {
        case 'obtenerTareas':
            $tareas = obtenerTareas();
            echo json_encode($tareas);
            break;
        // Puedes agregar más casos para otras consultas según sea necesario
        default:
            echo json_encode(array('error' => 'Acción no válida'));
            break;
    }
}

// Verificar si se recibe el parámetro accion por POST
if (isset($_POST['accion'])) {
    switch ($_POST['accion']) {
        case 'agregarTarea':
            $nombre = $_POST['texto'];
            $fecha_fin = $_POST['fecha'];
            agregarTarea($nombre, $fecha_fin);
            break;
        case 'eliminarTarea':
            $id = $_POST['id'];
            eliminarTarea($id);
            break;
        case 'completarTarea':
            $id = $_POST['id'];
            completarTarea($id);
            break;
    }
}

function agregarTarea($nombre, $fecha_fin) {
    global $conn;
    $sql = "INSERT INTO tareas (nombre, fecha_fin, estado) VALUES ('$nombre', '$fecha_fin', 'Pendiente')";
    if ($conn->query($sql) === TRUE) {
        $id = $conn->insert_id;
        echo json_encode(array('success' => true, 'id' => $id));
    } else {
        echo json_encode(array('error' => 'Error al insertar la tarea: ' . $conn->error));
    }
}

function eliminarTarea($id) {
    global $conn;
    $sql = "DELETE FROM tareas WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('error' => 'Error al eliminar la tarea: ' . $conn->error));
    }
}

function completarTarea($id) {
    global $conn;
    $sql = "UPDATE tareas SET estado = 'Completado' WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('error' => 'Error al completar la tarea: ' . $conn->error));
    }
}

// Función para obtener todas las tareas desde la base de datos
function obtenerTareas() {
    global $conn; // Haciendo referencia a la conexión global definida en config.php

    $sql = "SELECT * FROM tareas";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $tareas = array();
        while($row = $result->fetch_assoc()) {
            $tareas[] = $row;
        }
        return $tareas;
    } else {
        return array();
    }
}
?>
