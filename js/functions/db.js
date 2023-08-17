import UI from "../Class/UI.js";
import UITask from "../Class/UI2.js";
import { mostarRemoveCat } from './categorias.js';
import { mostrarModalTask } from './task.js';

const uiDb = new UI();
const uiDB2 = new UITask();
let DB;

export function abrirDB(){
    const db = indexedDB.open('todo',2);

    // Si no tiene la DB
    db.onupgradeneeded = function(){
        console.log('DB Creada exitosamente');

        const res = db.result;

        // Creando las tablas
        const categorias = res.createObjectStore('Categoria', {keyPath:'id_categoria', autoIncrement: true});
        const task = res.createObjectStore('Tareas', {keyPath:'id_task', autoIncrement: true});

        // Definiendo las tablas
        categorias.createIndex('id_categoria', 'id_categoria', {unique: true});
        categorias.createIndex('name_categoria', 'name_categoria', {unique: false});
        categorias.createIndex('color_categoria', 'color_categoria', {unique: false});

        task.createIndex('id_task', 'id_task', {unique: true});
        task.createIndex('tittle_task', 'tittle_task', {unique: false});
        task.createIndex('descripcion', 'descripcion', {unique: false});
        task.createIndex('categoria_task', 'categoria_task', {unique: false});
        task.createIndex('fechaLimite', 'fechaLimite', {unique: false});
    };

    // Todo bien
    db.onsuccess = function(){
        DB = db.result;
        getCategorias('inicio');
        getTareas('inicio');
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
        const alert = uiDb.alerta('Agregado correctamente','correct');

        // Insertando mensaje
        if(seccion == 'categoria'){
            uiDb.imprimirAlerta('form-agregar-cat',alert,'insertarCat');
            uiDb.limpiarFormCat();
        }

        if(seccion == 'tareas'){
            document.querySelector('#formTask').appendChild(alert);
            document.querySelector('#formTask').reset();
        }

        setTimeout( () => {
            alert.remove();
        }, 2000);


        console.log('Agregado correctamente');
    }

    getCategorias('inicio');
    getTareas('inicio');
}

export function editarDB(data, table){
    const transaction = DB.transaction(table, "readwrite");
    const cat = transaction.objectStore(table);

    cat.put(data);

    transaction.oncomplete = function(){
        const alert = uiDb.alerta('Editado correctamente','correct');

        uiDb.imprimirAlerta('form-agregar-cat',alert,'insertarCat');
        uiDb.limpiarFormCat();

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
            uiDb.imprimirCategoriaList(categorias); 
        }

        if(seccion == 'modal'){
            uiDb.viewRemoveCat(categorias);
        }
     
        if(seccion == 'task'){
            uiDB2.viewAddTask(categorias);
        }
    }
}

export function getTareas(seccion){
    const objectStore = DB.transaction('Tareas').objectStore('Tareas');

    const data = objectStore.getAll();
    
    data.onsuccess = function(){
        const task = data.result;

        if(seccion == 'inicio'){
            uiDB2.imprimirTaskInicio(task); 
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

export function getOneCategoria(id, seccion, id_task){
    const objectStore = DB.transaction('Categoria').objectStore('Categoria');

    const data = objectStore.getAll(id);
    
    data.onsuccess = function(){
        const categorias = data.result;

        if(seccion == 'task'){
            uiDB2.cambiarColorTd(categorias[0].color_categoria, id_task);
            return;
        }

        uiDb.viewEditCat(categorias[0]);

    }
}

export function getOneTask(id, seccion){
    const objectStore = DB.transaction('Tareas').objectStore('Tareas');
    const data = objectStore.getAll(id);
    
    let categoria;
    data.onsuccess = function(){
        const categorias = data.result;

        if(seccion == 'modalTask'){
            mostrarModalTask();
            console.log(categorias[0]);
            return;
        }

    }
}