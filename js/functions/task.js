import UI from "../Class/UI.js";
import {
    getCategorias,
    insertarDB
} from './db.js';

const uiT = new UI();

// Funciones
export function mostrarModalTask(tip){
    limpiarModalTask();
    document.querySelector('.modal-task').classList.toggle('mostrar');

    if(tip == 'add'){
        getCategorias('task');
    }
}

export function validarFormTask(){
    const titulo = document.querySelector('#tittleTask').value;
    const descripcion = document.querySelector('#descripcionTask').value;
    const categoria = document.querySelector('#categoriaTask').value;
    let fechaLimite = document.querySelector('#fechaTask').value;
    const chkFechaLimite = document.querySelector('#chkFecha').checked;

    // VALIDANDO QUE ES TITULO NO ESTE VACIO
    if(titulo == ''){
        const alerta = uiT.alerta('El titulo es obligatorio','error');
        document.querySelector('#formTask').appendChild(alerta);

        setTimeout( () =>{
            alerta.remove();
        },2000 );

        return;
    }
    

    if(!chkFechaLimite){
        fechaLimite = '';
    }

    // CREANDO OBJ
    const objTask = {
        tittle_task: titulo,
        descripcion,
        categoria_task: categoria,
        fechaLimite
    }
    insertarDB(objTask, 'Tareas', 'tareas');
}


export function limpiarModalTask(){
    const modal = document.querySelector('.container-modal-task');

    while(modal.firstChild){
        modal.removeChild(modal.firstChild);
    }
}