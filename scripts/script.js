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
        if (tareaTexto !== "") {
            const tareaElemento = crearTareaElemento(tareaTexto);
            listaPendiente.appendChild(tareaElemento);
            nuevaTareaInput.value = "";
            formularioContainer.style.display = "none"; // Ocultar el formulario después de añadir la tarea
        }
    });

    // Función para crear un nuevo elemento de tarea
    function crearTareaElemento(texto) {
        const tareaElemento = document.createElement('div');
        tareaElemento.classList.add('tarea');
        tareaElemento.textContent = texto;

        // Botón para marcar como completado
        const botonCompletar = document.createElement('button');
        botonCompletar.textContent = 'Completado';
        botonCompletar.classList.add('btnCompletado'); // Agregar clase para estilizar
        botonCompletar.addEventListener('click', function() {
            moverTareaACompletado(tareaElemento);
        });

        // Botón para eliminar la tarea
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('btnEliminar'); // Agregar clase para estilizar
        botonEliminar.addEventListener('click', function() {
            tareaElemento.remove();
        });

        tareaElemento.appendChild(botonCompletar);
        tareaElemento.appendChild(botonEliminar);

        return tareaElemento;
    }

    // Función para mover una tarea a la lista de completados
    function moverTareaACompletado(tareaElemento) {
        const listaCompletado = document.querySelector('#Completado .Lista');
        listaCompletado.appendChild(tareaElemento);
        tareaElemento.querySelector('.btnCompletado').remove(); // Eliminar el botón de completado
    }
});
