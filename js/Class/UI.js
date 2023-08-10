import { 
    validaFormAgregar,
    removeCategoria, 
    editarCategoria,
    limpiarCat
} from '../functions/categorias.js';

class UI {

    // CATEGORIAS FUNCTION
    viewAgregarCat(){
        const formAgregarCat = document.createElement('FORM');
        formAgregarCat.setAttribute('id', 'form-agregar-cat');

        // SCRIPTING
        const div1 = document.createElement('DIV');
        div1.classList.add('mb-3');
        const div2 = document.createElement('DIV');
        div1.classList.add('mb-3');

        const labelNombre = document.createElement('LABEL');
        labelNombre.setAttribute('for','CAT_Name');
        labelNombre.classList.add('form-label');
        labelNombre.textContent = 'Nombre';
        const labelColor = document.createElement('LABEL');
        labelColor.setAttribute('for','CAT_Color');
        labelColor.classList.add('form-label');
        labelColor.textContent = 'Color';

        const inputName = document.createElement('INPUT');
        inputName.setAttribute('type','text');
        inputName.setAttribute('name','CAT_Name');
        inputName.setAttribute('id','CAT_Name');
        inputName.classList.add('form-control');
        const inputColor = document.createElement('INPUT');
        inputColor.setAttribute('type','color');
        inputColor.setAttribute('name','CAT_Color');
        inputColor.setAttribute('id','CAT_Color');
        inputColor.classList.add('form-control');

        const btnForm = document.createElement('BUTTON');
        btnForm.setAttribute('type','button');
        btnForm.setAttribute('id','insertarCat');
        btnForm.classList.add('btn','btn-success');
        btnForm.textContent = 'Agregar';
        btnForm.addEventListener('click', () =>{
            validaFormAgregar();
        });

        // Inyectando al principal
        div1.appendChild(labelNombre);
        div1.appendChild(inputName);
        div2.appendChild(labelColor);
        div2.appendChild(inputColor);

        formAgregarCat.appendChild(div1);
        formAgregarCat.appendChild(div2);
        formAgregarCat.appendChild(btnForm);

        return formAgregarCat;
    }

    viewRemoveCat(categorias){
        const table = document.createElement('TABLE');

        // CREANDO THEAD
        const thead = document.createElement('THEAD');
        thead.innerHTML = `
            <tr> 
                <th scope="col" class="col-md-1">#</th>
                <th scope="col" class="col-md-9">Categoria</th>
                <th scope="col" colspan="2" class="col-md-2"></th>
            </tr>
        `;

        // CREANDO TBODY
        const tbody = document.createElement('TBODY');
        let contador = 1;
        categorias.forEach(categoria =>{
            const tr = document.createElement('TR');
            tr.setAttribute('id',categoria.id_categoria);

            const th = document.createElement('TH');
            th.textContent = contador;
            const tdName = document.createElement('TD');
            tdName.textContent = categoria.name_categoria;
            const tdButton = document.createElement('TD');
            const tdButton2 = document.createElement('TD');
            // BOTON DE ELIMINAR
            const btnEliminar = document.createElement('BUTTON');
            btnEliminar.setAttribute('type','button');
            btnEliminar.textContent = 'Borrar';
            btnEliminar.classList.add('btn','btn-danger');
            // BOTON DE EDITAR
            const btnEditar = document.createElement('DIV');
            btnEditar.setAttribute('type','button');
            btnEditar.textContent = 'Editar';
            btnEditar.classList.add('btn','btn-info');

            // Funcion del boton
            btnEliminar.addEventListener('click', e =>{
                const id = Number(e.target.parentElement.parentElement.id);
                removeCategoria(id);
            });

            btnEditar.addEventListener('click', e =>{
                const id = Number(e.target.parentElement.parentElement.id);
                editarCategoria(id);
            });

            tdButton.appendChild(btnEliminar);
            tdButton2.appendChild(btnEditar);

            tr.appendChild(th);
            tr.appendChild(tdName);
            tr.appendChild(tdButton);
            tr.appendChild(tdButton2);

            tbody.appendChild(tr);
            contador++;
        });

        table.appendChild(thead);
        table.appendChild(tbody);

        document.querySelector('#containerModal').appendChild(table);
    }

    viewEditCat(categoria){
        limpiarCat();

        const {color_categoria, name_categoria, id_categoria} = categoria;
        
        const formAgregarCat = document.createElement('FORM');
        formAgregarCat.setAttribute('id', 'form-agregar-cat');

        // SCRIPTING
        const div1 = document.createElement('DIV');
        div1.classList.add('mb-3');
        const div2 = document.createElement('DIV');
        div1.classList.add('mb-3');

        const labelNombre = document.createElement('LABEL');
        labelNombre.setAttribute('for','CAT_Name');
        labelNombre.classList.add('form-label');
        labelNombre.textContent = 'Nombre';
        const labelColor = document.createElement('LABEL');
        labelColor.setAttribute('for','CAT_Color');
        labelColor.classList.add('form-label');
        labelColor.textContent = 'Color';

        const inputName = document.createElement('INPUT');
        inputName.setAttribute('type','text');
        inputName.setAttribute('name','CAT_Name');
        inputName.setAttribute('id','CAT_Name');
        inputName.value = name_categoria;
        inputName.classList.add('form-control');
        const inputColor = document.createElement('INPUT');
        inputColor.setAttribute('type','color');
        inputColor.setAttribute('name','CAT_Color');
        inputColor.setAttribute('id','CAT_Color');
        inputColor.classList.add('form-control');
        inputColor.value = color_categoria;

        const btnForm = document.createElement('BUTTON');
        btnForm.setAttribute('type','button');
        btnForm.setAttribute('id','insertarCat');
        btnForm.classList.add('btn','btn-success');
        btnForm.textContent = 'Aceptar';
        btnForm.addEventListener('click', () =>{
            validaFormAgregar(categoria);
        });

        // Inyectando al principal
        div1.appendChild(labelNombre);
        div1.appendChild(inputName);
        div2.appendChild(labelColor);
        div2.appendChild(inputColor);

        formAgregarCat.appendChild(div1);
        formAgregarCat.appendChild(div2);
        formAgregarCat.appendChild(btnForm);

        document.querySelector('#containerModal').appendChild(formAgregarCat);
    }

    alerta(msj, tipo){
        const divAlert = document.createElement('DIV');
        divAlert.classList.add('alert');
        divAlert.textContent = msj;

        if(tipo === 'correct'){
            divAlert.classList.add('alert-success');
        }
        if(tipo === 'error'){
            divAlert.classList.add('alert-danger');
        }

        return divAlert;
    }

    imprimirAlerta(id1, alert, id2){
        // Imprimiendo la alerta
        document.querySelector(`#${id1}`).insertBefore(alert, document.querySelector(`#${id2}`));

    }

    limpiarFormCat(){
        const formCategoria = document.querySelector('#form-agregar-cat');
        formCategoria.reset();
    }

    imprimirCategoriaList(categorias){
        const div = document.querySelector('#list-categorias');
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }

        categorias.forEach( categoria =>{
            const btnCategoria = document.createElement('BUTTON');
            btnCategoria.setAttribute('type','button');
            btnCategoria.classList.add('list-group-item', 'list-group-item-action');
            btnCategoria.textContent = categoria.name_categoria;

            div.appendChild(btnCategoria);
        });
    }

    // TASK FUNCTION
    viewAddTask(categorias){
        // Creando FORM
        const form = document.createElement('FORM');

        // CREANDO DIVS DEL FORM
        const div1 = document.createElement('DIV');
        div1.classList.add('mb-3');
        const div2 = document.createElement('DIV');
        div2.classList.add('mb-3');
        const div3 = document.createElement('DIV');
        div3.classList.add('mb-3');
        const div4 = document.createElement('DIV');
        div4.classList.add('mb-3');
        const div5 = document.createElement('DIV');
        div5.classList.add('form-check');
        const div6 = document.createElement('DIV');
        div6.classList.add('mb-3');
        

        // CREANDO LABELS DE LOS DIV
        const lblTittle = document.createElement('LABEL');
        lblTittle.setAttribute('for','tittle');
        lblTittle.classList.add('form-label');
        lblTittle.textContent = 'Titulo';
        const lblDescripcion = document.createElement('LABEL');
        lblDescripcion.setAttribute('for','descripcionTask');
        lblDescripcion.classList.add('form-label');
        lblDescripcion.textContent = 'Descripcion';
        const lblCategoria = document.createElement('LABEL');
        lblCategoria.setAttribute('for','categoriaTask');
        lblCategoria.classList.add('form-label');
        lblCategoria.textContent = 'Categoria';
        const lblFecha = document.createElement('LABEL');
        lblFecha.setAttribute('for','chkFecha');
        lblFecha.classList.add('form-check-label');
        lblFecha.textContent = 'Fecha limite';

        // CREANDO LOS INPUTS DE LOS DIV
        const inputTittle = document.createElement('INPUT');
        inputTittle.setAttribute('type','text');
        inputTittle.setAttribute('name','tittleTask');
        inputTittle.setAttribute('id','tittleTask');
        inputTittle.classList.add('form-control');
        const inputDescripcion = document.createElement('TEXTAREA');
        inputDescripcion.setAttribute('cols','10');
        inputDescripcion.setAttribute('rows','2');
        inputDescripcion.setAttribute('name','descripcionTask');
        inputDescripcion.setAttribute('id','descripcionTask');
        inputDescripcion.classList.add('form-control');
        const chkFecha = document.createElement('INPUT');
        chkFecha.setAttribute('type','checkbox');
        chkFecha.setAttribute('name','chkFecha');
        chkFecha.setAttribute('id','chkFecha');
        chkFecha.classList.add('form-check-input');
        const inputFecha = document.createElement('INPUT');
        inputFecha.setAttribute('type','date');
        inputFecha.setAttribute('name','fechaTask');
        inputFecha.setAttribute('id','fechaTask');
        inputFecha.classList.add('form-control','d-none');

        // CREANDO SELECT
        const selectCategoria = document.createElement('SELECT');
        selectCategoria.setAttribute('name','categoriaTask');
        selectCategoria.setAttribute('id','categoriaTask');
        selectCategoria.classList.add('form-control');
        const opcDefault = document.createElement('OPTION');
        opcDefault.setAttribute('selected','');
        opcDefault.textContent = 'Selecciona una opcion';
        selectCategoria.appendChild(opcDefault);
        categorias.forEach(categoria =>{
            const { id_categoria, name_categoria} = categoria;

            const opcCategoria = document.createElement('OPTION');
            opcCategoria.setAttribute('id',id_categoria);
            opcCategoria.textContent = name_categoria;

            selectCategoria.appendChild(opcCategoria);
        });

        // ACCIONES
        chkFecha.addEventListener('change', e =>{
            if(chkFecha.checked == true){
                inputFecha.classList.remove('d-none');
            }else{
                inputFecha.classList.add('d-none');
            }
        });
        
        // INSERTANDO EN LOS DIV
        div5.appendChild(chkFecha);
        div5.appendChild(lblFecha);
        div6.appendChild(inputFecha);

        div1.appendChild(lblTittle);
        div1.appendChild(inputTittle);
        div2.appendChild(lblDescripcion);
        div2.appendChild(inputDescripcion);
        div3.appendChild(lblCategoria);
        div3.appendChild(selectCategoria);
        div4.appendChild(div5);
        div4.appendChild(div6);

        // INSERTANDO EN EL FORM
        form.appendChild(div1);
        form.appendChild(div2);
        form.appendChild(div3);
        form.appendChild(div4);

        document.querySelector('.container-modal-task').appendChild(form);
    }
}

export default UI;