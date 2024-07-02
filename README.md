```markdown
# Proyecto ToDo

Este es un proyecto de lista de tareas (ToDo) que permite a los usuarios agregar, completar y eliminar tareas. Las tareas se clasifican en diferentes categorías: "Mi día", "Pendiente", "Completado" y "Caducado".

## Características

- **Agregar Tareas**: Los usuarios pueden agregar nuevas tareas con una fecha de finalización opcional.
- **Completar Tareas**: Las tareas pueden ser marcadas como completadas.
- **Eliminar Tareas**: Las tareas pueden ser eliminadas.
- **Clasificación Automática**: Las tareas se clasifican automáticamente en "Mi día", "Pendiente", "Completado" y "Caducado" según su estado y fecha de finalización.
- **Interfaz Responsiva**: La interfaz se adapta a diferentes tamaños de pantalla.

## Estructura del Proyecto

El proyecto está compuesto por los siguientes archivos principales:

- `index.html`: Contiene la estructura HTML de la aplicación.
- `styles/style.css`: Contiene los estilos CSS para la aplicación.
- `scripts/script.js`: Contiene la lógica JavaScript para la manipulación del DOM y las solicitudes AJAX.
- `consultas.php`: Contiene las funciones PHP para interactuar con la base de datos.
- `config.php`: Contiene la configuración de la conexión a la base de datos.

## Instalación

1. Clona el repositorio en tu máquina local.
2. Configura la base de datos en `config.php` con tus credenciales de base de datos.
3. Asegúrate de que tu servidor web tenga soporte para PHP y MySQL.
4. Abre `index.html` en tu navegador web.

## Uso

### Agregar una Tarea

1. Haz clic en el botón "+" para abrir el formulario de creación de tareas.
2. Ingresa el nombre de la tarea y una fecha de finalización opcional.
3. Haz clic en "Añadir" para agregar la tarea a la lista.

### Completar una Tarea

1. Haz clic en el botón "Completado" junto a la tarea que deseas marcar como completada.
2. La tarea se moverá a la lista "Completado".

### Eliminar una Tarea

1. Haz clic en el botón "Eliminar" junto a la tarea que deseas eliminar.
2. La tarea será eliminada de la lista.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor haz un fork del repositorio y envía un pull request con tus cambios.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
