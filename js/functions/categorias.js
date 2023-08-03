import UI from "../Class/UI.js";
import { insertarDB } from './db.js';
 
// Variables 
const ui = new UI();
const containerModal = document.querySelector('#containerModal');

// EXPORT FUNCTIONS

/**
 * FUNCIONES DE VISTAS
 */
export function mostrarModalCat(){
    document.querySelector('.modal-categorias').classList.toggle('mostrar');
}

export function mostrarAddCat(){
    limpiarCat();

    // Insertando el HTML generado en JS
    const formAddCat = ui.viewAgregarCat();
    containerModal.append(formAddCat);
}

/**
 * FUNCIONES DE ACCION
 */
export function addCategoria(){
    const name = document.querySelector('#CAT_Name').value;
    console.log(name);
    // insertarDB(categoria, "Categoria");
}

// FUNTIONS
function limpiarCat(){
    while(containerModal.firstChild){
        containerModal.removeChild(containerModal.firstChild);
    }
}