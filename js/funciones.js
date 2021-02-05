let sectionTareas = document.querySelector('.listaTareas');

function pintarTareas(pListaTareas, pSection) {
    for (let tarea of pListaTareas) {
        const nuevaTarea = pintarTarea(tarea);
        pSection.appendChild(nuevaTarea)
    }
}


function pintarTarea(pTarea) {
    let div = document.createElement('div')
    let p = document.createElement('p');
    let button = document.createElement('button')

    div.appendChild(p)
    div.appendChild(button)

    p.innerText = pTarea.tarea
    button.innerText = 'Eliminar'
    div.classList.add(pTarea.prioridad)

    button.dataset.id = pTarea.id;
    button.addEventListener('click', borrarTarea)

    return div
}
//-----

let button = document.getElementById('guardar')
button.addEventListener('click', crearTarea)

function crearTarea(event) {
    let inputTarea = document.getElementById('tarea')
    let prioridad = document.getElementById('prioridad')

    tareas.push({
        id: 5,
        tarea: inputTarea.value,
        prioridad: prioridad.value

    })
    sectionTareas.innerHTML = ""
    pintarTareas(tareas, sectionTareas);

}

//-----

function borrarTarea(event) {
    let div = event.target.parentNode;
    div.parentNode.removeChild(div);

    let id = parseInt(event.target.dataset.id)
    let position = tareas.findIndex(tarea => tarea.id === id)
    tareas.splice(position, 1)
}

//-----

pintarTareas(tareas, sectionTareas);

//-----

let selectPrioridad = document.querySelector('#prioridadFiltro')
let buttonBuscar = document.getElementById('buscar')
selectPrioridad.addEventListener('change', obtenerPrioridad)

function obtenerPrioridad(event) {
    let prioridad = event.target.value;
    if (prioridad != "") {
        let listaFiltrada = filtrarPorPrioridad(prioridad, tareas)
        pintarTareas(listaFiltrada)
    } else {
        pintarTareas(tareas)
    }
}

function filtrarPorPrioridad(pPrioridad, pListaTareas) {
    const listaFiltrada = pListaTareas.filter(tarea => tarea.prioridad == pPrioridad);
    return listaFiltrada;
}

//-----

let inputGeneral = getElementById('buscador');
inputGeneral.addEventListener('keydown', obtenerInfoInput);

function obtenerInfoInput(event) {
    if (event.keyCode == 13) {
        let textoBuscar = inputGeneral.value;
        let listaTareaGeneral = buscarPorTexto(textoBuscar, tareas)
        pintarTareas(tareas, listaTareaGeneral)
    }
}

function buscarPorTexto(pTexto, pListaTareas) {
    const filtrarLista = pListaTareas.filter(tarea => tarea.tarea.toLowerCase().includes(pTexto.toLowerCase))
    return filtrarLista
}
