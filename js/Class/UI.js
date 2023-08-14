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

}

export default UI;