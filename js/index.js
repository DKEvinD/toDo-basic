import { 
    mostrarModalCat, 
    mostrarAddCat, 
    mostarRemoveCat
} from './functions/categorias.js';
import { abrirDB } from './functions/db.js';

(function(){
    // SELECTORES
    const btnViewCat = document.querySelector('#btn-add-categoria');
    const btnAgregarCat = document.querySelector('#btnAgregarCat');
    const btnEliminarCat = document.querySelector('#btnEliminarCat');
    
    // EVENTOS
    btnViewCat.addEventListener('click', mostrarModalCat)
    btnAgregarCat.addEventListener('click', mostrarAddCat);
    btnEliminarCat.addEventListener('click', mostarRemoveCat);

    document.addEventListener('DOMContentLoaded', () =>{
        abrirDB();
    });

})();