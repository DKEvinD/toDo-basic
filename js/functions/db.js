import UI from "../Class/UI.js";
import { mostarRemoveCat } from './categorias.js';

const ui = new UI();
let DB;

export function abrirDB(){
    const db = indexedDB.open('todo',1);

    // Si no tiene la DB
    db.onupgradeneeded = function(){
        console.log('DB Creada exitosamente');

        const res = db.result;

        // Creando las tablas
        const categorias = res.createObjectStore('Categoria', {keyPath:'id_categoria', autoIncrement: true});


        // Definiendo las tablas
        categorias.createIndex('id_categoria', 'id_categoria', {unique: true});
        categorias.createIndex('name_categoria', 'name_categoria', {unique: false});
        categorias.createIndex('color_categoria', 'color_categoria', {unique: false});
    };

    // Todo bien
    db.onsuccess = function(){
        DB = db.result;
        getCategorias('inicio');
    };

    // Si hay un error
    db.onerror = function(){
        console.error("Error", db.error);
    };
}

export function insertarDB(data, table, seccion){

    const transaction = DB.transaction(table, "readwrite");
    const cat = transaction.objectStore(table);

    cat.add(data);

    transaction.oncomplete = function(){
        const alert = ui.alerta('Agregado correctamente','correct');

        // Insertando mensaje
        if(seccion == 'categoria'){
            ui.imprimirAlerta('form-agregar-cat',alert,'insertarCat');
            ui.limpiarFormCat();
        }

        setTimeout( () => {
            alert.remove();
        }, 2000);


        console.log('Agregado correctamente');
    }

    getCategorias('inicio');
}

export function editarDB(data, table){
    const transaction = DB.transaction(table, "readwrite");
    const cat = transaction.objectStore(table);

    cat.put(data);

    transaction.oncomplete = function(){
        const alert = ui.alerta('Editado correctamente','correct');

        ui.imprimirAlerta('form-agregar-cat',alert,'insertarCat');
        ui.limpiarFormCat();

        setTimeout( () => {
            alert.remove();
            mostarRemoveCat();
            
        }, 2000);


        console.log('Editado correctamente');
    }

    getCategorias('inicio');
}

export function getCategorias(seccion){
    const objectStore = DB.transaction('Categoria').objectStore('Categoria');

    const data = objectStore.getAll();
    
    data.onsuccess = function(){
        const categorias = data.result;

        if(seccion == 'inicio'){
            ui.imprimirCategoriaList(categorias); 
        }

        if(seccion == 'modal'){
            ui.viewRemoveCat(categorias);
        }
     
        if(seccion == 'task'){
            ui.viewAddTask(categorias);
        }
    }
}

export function removeCat(id){
    const transaction = DB.transaction('Categoria','readwrite');
    const objectStore = transaction.objectStore('Categoria');

    objectStore.delete(id);

    transaction.oncomplete = () =>{
        mostarRemoveCat();
    }
}

export function getOneCategoria(id){
    const objectStore = DB.transaction('Categoria').objectStore('Categoria');

    const data = objectStore.getAll(id);
    
    data.onsuccess = function(){
        const categorias = data.result;

        ui.viewEditCat(categorias[0]);
     
    }
}