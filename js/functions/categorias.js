import UI from "../Class/UI.js";
import { insertarDB, getCategorias } from './db.js';
 
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

export function mostarRemoveCat(){

}

export async function mostrarCategorias(){
    console.log('Obteniendo CAt');

    const dat = await getCategorias();
    console.log(dat);
}

/**
 * FUNCIONES DE ACCION
 */
export function validaFormAgregar(){
    const name = document.querySelector('#CAT_Name').value;
    const color = document.querySelector('#CAT_Color').value;

    if(name == ''){
        const alert = ui.alerta('El nombre es obligatorio','error');

        // Imprimiendo la alerta
        ui.imprimirAlerta('form-agregar-cat',alert,'insertarCat');

        setTimeout( () => {
            alert.remove();
        }, 2000);

        return;
    }

    const categoria = {
        name_categoria: name,
        color_categoria: color
    }

    insertarDB(categoria, "Categoria",'categoria');
}

// FUNTIONS
function limpiarCat(){
    while(containerModal.firstChild){
        containerModal.removeChild(containerModal.firstChild);
    }
}