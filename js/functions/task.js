import UI from "../Class/UI.js";
import {
    getCategorias
} from './db.js';


// Variable
const uiT = new UI();

// Funciones
export function mostrarModalTask(tip){
    limpiarModalTask();
    document.querySelector('.modal-task').classList.toggle('mostrar');

    if(tip == 'add'){
        getCategorias('task');
    }
}


export function limpiarModalTask(){
    const modal = document.querySelector('.container-modal-task');

    while(modal.firstChild){
        modal.removeChild(modal.firstChild);
    }
}