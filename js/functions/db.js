import UI from "../Class/UI.js";

const ui = new UI();

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
        const result = db.result;

        console.log(result);
    };

    // Si hay un error
    db.onerror = function(){
        console.error("Error", db.error);
    };
}

export function insertarDB(data, table, seccion){
    const db = indexedDB.open('todo',1);

    db.onsuccess = function(){
        const result = db.result;

        const transaction = result.transaction(table, "readwrite");
        const cat = transaction.objectStore(table);

        const request = cat.add(data);

        request.onsuccess = function(){
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

        request.onerror = function(){
            console.log("Error", request.error);
        }
    };

    
}

export async function getCategorias(){
    const db = indexedDB.open('todo',1);

    db.onsuccess = function(){
        const result = db.result;

        const transaction = result.transaction('Categoria', "readonly");
        const cat = transaction.objectStore('Categoria');

        const data = cat.getAll();

        data.onsuccess = function(){
            return data.result;
        }
    };
}