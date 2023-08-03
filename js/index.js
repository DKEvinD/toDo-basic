import { mostrarModalCat, mostrarAddCat, addCategoria } from './functions/categorias.js';
import { abrirDB } from './functions/db.js';

(function(){
    // SELECTORES
    const btnViewCat = document.querySelector('#btn-add-categoria');
    const btnAgregarCat = document.querySelector('#btnAgregarCat');
    const formInsertar = document.querySelector('#insertarCat');

    // EVENTOS
    btnViewCat.addEventListener('click', mostrarModalCat)
    btnAgregarCat.addEventListener('click', mostrarAddCat);

    if(formInsertar){
        formInsertar.addEventListener('click', () =>{
            console.log('holaa');
            addCategoria();
        });
    }

    document.addEventListener('DOMContentLoaded', () =>{
        abrirDB();
    });

})();