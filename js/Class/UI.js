import { validaFormAgregar } from '../functions/categorias.js';

class UI {
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

        // formAgregarCat.innerHTML =`
        //     <div class="mb-3">
        //         <label for="CAT_Name" class="form-label">Nombre</label>
        //         <input type="text" name="CAT_Name" id="CAT_Name" class="form-control">
        //     </div>
        //     <div class="mb-3">
        //         <label for="CAT_Color" class="form-label">Color</label>
        //         <input type="color" name="CAT_Color" id="CAT_Color" class="form-control">
        //     </div>
        //     <button type="button" class="btn btn-success" id="insertarCat"> Agregar </button>
        // `;

        return formAgregarCat;
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

}

export default UI;