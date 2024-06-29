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
    const listaPendiente = document.querySelector('#Pendiente .Lista');

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
        const fechaFin = document.getElementById('fechaFin').value;
        if (tareaTexto !== "") {
            const tareaElemento = crearTareaElemento(tareaTexto, fechaFin);
            listaPendiente.appendChild(tareaElemento);
            nuevaTareaInput.value = "";
            document.getElementById('fechaFin').value = ""; // Limpiar el campo de fecha
            formularioContainer.style.display = "none"; // Ocultar el formulario después de añadir la tarea
        }
    });

    // Función para crear un nuevo elemento de tarea
    function crearTareaElemento(texto, fechaFin) {
        const tareaElemento = document.createElement('div');
        tareaElemento.classList.add('tarea');

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
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('btnEliminar');
        botonEliminar.addEventListener('click', function() {
            tareaElemento.remove();
        });

        botonesContenedor.appendChild(botonCompletar);
        botonesContenedor.appendChild(botonEliminar);

        // Añadir contenedores al elemento de tarea
        tareaElemento.appendChild(textoYFechaContenedor);
        tareaElemento.appendChild(botonesContenedor);

        return tareaElemento;
    }

    // Función para mover una tarea a la lista de completados
    function moverTareaACompletado(tareaElemento) {
        const listaCompletado = document.querySelector('#Completado .Lista');
        listaCompletado.appendChild(tareaElemento);
        tareaElemento.querySelector('.btnCompletado').remove(); // Eliminar el botón de completado
    }
});
