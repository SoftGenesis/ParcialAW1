document.addEventListener("DOMContentLoaded", function() {
    cargarTareas();
  });
  
  function agregarTarea(event) {
    event.preventDefault();
  
    const titulo = document.querySelector("#txtTitulo").value;
    const desc = document.querySelector("#txtDesc").value;
    const fecha = document.querySelector("#dtpFecha").value;
    const edo = document.querySelector("#Ed").checked;
  
    const tarea = {
      titulo,
      desc,
      fecha,
      edo,
    };

  // Obtener tareas existentes o inicializar un array vacío
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  // Agregar la nueva tarea al array
  tareas.push(tarea);

  // Guardar el array actualizado en localStorage
  localStorage.setItem("tareas", JSON.stringify(tareas));

  // Limpiar el formulario
  document.querySelector("form").reset();

  // Recargar la lista de tareas
  cargarTareas();
}

function cargarTareas() {
  const listaTareas = document.getElementById("Tareaslst");
  listaTareas.innerHTML = "";

  // Obtener tareas almacenadas en localStorage
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  // Mostrar cada tarea en la lista
  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
        <strong>${tarea.titulo}</strong>
        <br>${tarea.desc}<br>Fecha límite: ${tarea.fecha}
        <br>Estado: ${tarea.edo ? "Activa" : "Inactiva"}
        <br><button class="btn btn-info" onclick="cambiarEstado(${index})">Modificar</button>
        <button class="btn btn-light" onclick="eliminarTarea(${index})">Eliminar</button>`;
    listaTareas.appendChild(li);
  });
}

function cambiarEstado(index) {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  // Cambiar el estado de la tarea en la posición index
  tareas[index].estado = !tareas[index].estado;

  // Actualizar el array en localStorage
  localStorage.setItem("tareas", JSON.stringify(tareas));

  // Recargar la lista de tareas
  cargarTareas();
}

function eliminarTarea(index) {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  // Eliminar la tarea en la posición index
  tareas.splice(index, 1);

  // Actualizar el array en localStorage
  localStorage.setItem("tareas", JSON.stringify(tareas));

  // Recargar la lista de tareas
  cargarTareas();
}