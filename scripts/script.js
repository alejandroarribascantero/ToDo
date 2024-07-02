// scripts/script.js

document.addEventListener('DOMContentLoaded', function() {
    // JavaScript para desplegar y ocultar las listas de tareas
    document.querySelectorAll('.Desplegable').forEach(item => {
        item.addEventListener('click', event => {
            const lista = item.nextElementSibling;
            if (lista.style.display === "none" || lista.style.display === "") {
                lista.style.display = "block";
            } else {
                lista.style.display = "none";
            }
        });
    });

    // Referencias al botón "Crear" y al formulario
    const botonCrear = document.getElementById('Crear');
    const formularioContainer = document.getElementById('formularioContainer');
    const formularioTarea = document.getElementById('formularioTarea');
    const nuevaTareaInput = document.getElementById('nuevaTarea');
    const fechaFinInput = document.getElementById('fechaFin');
    const listaPendiente = document.querySelector('#Pendiente .Lista');
    const listaCompletado = document.querySelector('#Completado .Lista');

    // Mostrar/ocultar el formulario al hacer clic en el botón "Crear"
    botonCrear.addEventListener('click', function() {
        if (formularioContainer.style.display === "none" || formularioContainer.style.display === "") {
            formularioContainer.style.display = "block";
        } else {
            formularioContainer.style.display = "none";
        }
    });

    // Añadir funcionalidad para el formulario de creación de tareas
    formularioTarea.addEventListener('submit', function(event) {
        event.preventDefault();
        const tareaTexto = nuevaTareaInput.value.trim();
        const fechaFin = fechaFinInput.value;

        // Realizar la solicitud AJAX para añadir la nueva tarea
        if (tareaTexto !== "") {
            agregarNuevaTarea(tareaTexto, fechaFin);
        }
    });

    // Llamar a la función para obtener todas las tareas al cargar la página
    obtenerTareas();
});

function obtenerTareas() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                if (this.responseText) { // Verificar que la respuesta no esté vacía
                    var tareas = JSON.parse(this.responseText);
                    console.log(tareas);

                    // Actualizar el DOM con las tareas
                    tareas.forEach(function(tarea) {
                        const tareaElemento = crearTareaElemento(tarea.id, tarea.nombre, tarea.fecha_fin, tarea.estado);
                    });
                } else {
                    console.error("La respuesta está vacía.");
                }
            } catch (e) {
                console.error("Error al analizar la respuesta JSON: ", e);
            }
        }
    };
    xhttp.open("GET", "consultas.php?action=obtenerTareas", true);
    xhttp.send();
}

// Función para agregar una nueva tarea mediante AJAX
function agregarNuevaTarea(tareaTexto, fechaFin) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Manejar la respuesta aquí (opcional)
            console.log(this.responseText);
            var respuesta = JSON.parse(this.responseText);
            if (respuesta.success) {
                // Crear visualmente la tarea en el frontend
                const tareaElemento = crearTareaElemento(respuesta.id, tareaTexto, fechaFin);
                nuevaTareaInput.value = "";
                fechaFinInput.value = "";
                formularioContainer.style.display = "none"; // Ocultar el formulario después de añadir la tarea
            } else {
                console.error("Error al agregar la tarea: ", respuesta.error);
            }
        }
    };
    xhttp.open("POST", "consultas.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("accion=agregarTarea&texto=" + tareaTexto + "&fecha=" + fechaFin);
}

// Función para crear un nuevo elemento de tarea en el frontend
function crearTareaElemento(id, texto, fechaFin, estado) {
    const tareaElemento = document.createElement('div');
    tareaElemento.classList.add('tarea');
    tareaElemento.dataset.id = id; // Añadir el ID de la tarea

    // Contenedor para el texto y la fecha
    const textoYFechaContenedor = document.createElement('div');
    textoYFechaContenedor.classList.add('texto-fecha');

    // Elemento para el texto
    const textoElemento = document.createElement('div');
    textoElemento.classList.add('nombre-tarea');
    textoElemento.textContent = texto;
    textoYFechaContenedor.appendChild(textoElemento);

    // Añadir fecha de fin solo si está presente
    if (fechaFin) {
        const fechaElemento = document.createElement('div');
        fechaElemento.classList.add('fecha-fin');
        const fecha = new Date(fechaFin);
        const fechaFormateada = fecha.toLocaleDateString('es', { day: '2-digit', month: '2-digit', year: 'numeric' });
        fechaElemento.textContent = 'Fecha de Fin: ' + fechaFormateada;
        textoYFechaContenedor.appendChild(fechaElemento);
    }

    // Botones de acción
    const botonesContenedor = document.createElement('div');
    botonesContenedor.classList.add('botones');

    const botonCompletar = document.createElement('button');
    botonCompletar.textContent = 'Completado';
    botonCompletar.classList.add('btnCompletado');
    botonCompletar.addEventListener('click', function() {
        moverTareaACompletado(tareaElemento);
        completarTarea(id); // Llamar a la función para marcar como completada
    });

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('btnEliminar');
    botonEliminar.addEventListener('click', function() {
        tareaElemento.remove();
        eliminarTarea(id); // Llamar a la función para eliminar
    });

    botonesContenedor.appendChild(botonCompletar);
    botonesContenedor.appendChild(botonEliminar);

    // Añadir contenedores al elemento de tarea
    tareaElemento.appendChild(textoYFechaContenedor);
    tareaElemento.appendChild(botonesContenedor);

    // Determinar dónde colocar la tarea en función de la fecha y el estado
    if (estado === 'Completado') {
        const listaCompletado = document.querySelector('#Completado .Lista');
        listaCompletado.appendChild(tareaElemento);
        tareaElemento.querySelector('.btnCompletado').remove(); // Eliminar el botón de completado
    } else if (fechaFin && esHoy(fechaFin)) {
        const listaMiDia = document.querySelector('#MiDia .Lista');
        listaMiDia.appendChild(tareaElemento);
    } else if (fechaFin && esCaducada(fechaFin)) {
        const listaCaducado = document.querySelector('#Caducado .Lista');
        listaCaducado.appendChild(tareaElemento);
    } else {
        const listaPendiente = document.querySelector('#Pendiente .Lista');
        listaPendiente.appendChild(tareaElemento);
    }

    return tareaElemento;
}

// Función para verificar si una tarea está caducada
function esCaducada(fechaFin) {
    const hoy = new Date();
    const fecha = new Date(fechaFin);
    return fecha < hoy;
}

// Función para verificar si una tarea es para hoy
function esHoy(fechaFin) {
    const hoy = new Date();
    const fecha = new Date(fechaFin);
    return fecha.toDateString() === hoy.toDateString();
}

// Función para mover una tarea a la lista de completados
function moverTareaACompletado(tareaElemento) {
    const listaCompletado = document.querySelector('#Completado .Lista');
    listaCompletado.appendChild(tareaElemento);
    tareaElemento.querySelector('.btnCompletado').remove(); // Eliminar el botón de completado
}

// Función para eliminar una tarea mediante AJAX
function eliminarTarea(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open("POST", "consultas.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("accion=eliminarTarea&id=" + id);
}

// Función para marcar una tarea como completada mediante AJAX
function completarTarea(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open("POST", "consultas.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("accion=completarTarea&id=" + id);
}
