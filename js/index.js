import { 
    mostrarModalCat, 
    mostrarAddCat, 
    mostarRemoveCat
} from './functions/categorias.js';

import {
    mostrarModalTask
} from './functions/task.js';


import { abrirDB } from './functions/db.js';

(function(){
    // SELECTORES
    const btnViewCat = document.querySelector('#btn-add-categoria');
    const btnSalirCat = document.querySelector('#btnSalirModalCat');
    const btnAgregarCat = document.querySelector('#btnAgregarCat');
    const btnEliminarCat = document.querySelector('#btnEliminarCat');
    const btnViewTask = document.querySelector('#btnAddTask');
    const btnSalirTask = document.querySelector('#btnSalirModalTask');

    // EVENTOS
    btnViewCat.addEventListener('click', mostrarModalCat);
    btnSalirCat.addEventListener('click', mostrarModalCat)
    btnAgregarCat.addEventListener('click', mostrarAddCat);
    btnEliminarCat.addEventListener('click', mostarRemoveCat);
    btnViewTask.addEventListener('click', () => {
        mostrarModalTask('add');
    });
    btnSalirTask.addEventListener('click', mostrarModalTask);

    document.addEventListener('DOMContentLoaded', () =>{
        abrirDB();
    });

})();