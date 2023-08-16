import { getOneCategoria } from '../functions/db.js';
import {
    validarFormTask
} from '../functions/task.js';

class UITask {
    // TASK FUNCTION
    viewAddTask(categorias){
        // Creando FORM
        const form = document.createElement('FORM');
        form.setAttribute('id','formTask');

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
        opcDefault.setAttribute('value','N/A');
        opcDefault.textContent = 'Selecciona una opcion';
        selectCategoria.appendChild(opcDefault);
        categorias.forEach(categoria =>{
            const { id_categoria, name_categoria} = categoria;

            const opcCategoria = document.createElement('OPTION');
            opcCategoria.setAttribute('id',id_categoria);
            opcCategoria.setAttribute('value',id_categoria);
            opcCategoria.textContent = name_categoria;

            selectCategoria.appendChild(opcCategoria);
        });

        // CREANDO BUTTON
        const btnEnviar = document.createElement('BUTTON');
        btnEnviar.setAttribute('type','button');
        btnEnviar.setAttribute('id','btnAddTask');
        btnEnviar.classList.add('btn','btn-success');
        btnEnviar.textContent = 'Agregar';

        // ACCIONES
        chkFecha.addEventListener('change', e =>{
            if(chkFecha.checked == true){
                inputFecha.classList.remove('d-none');
            }else{
                inputFecha.classList.add('d-none');
            }
        });

        btnEnviar.addEventListener('click', validarFormTask);
        
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
        form.appendChild(btnEnviar);

        document.querySelector('.container-modal-task').appendChild(form);
    }

    imprimirTaskInicio(task){
        const tableTask = document.querySelector('#tbody-task');

        // CREANDO LINE A DE TASK
        task.forEach( tarea => {
            const { categoria_task, descripcion, fechaLimite, id_task, tittle_task } = tarea;
            
            if(!isNaN(categoria_task)){
                getOneCategoria(Number(categoria_task),'task', `tr_${id_task}`);
            }
            
            // CREANDO LINE TR
            const tr = document.createElement('TR');
            tr.setAttribute('id',`tr_${id_task}`);

            // CREANDO TD'S
            const tdColor = document.createElement('TD');
            const tdCheck = document.createElement('TD');
            tdCheck.setAttribute('scope','row');
            const tdDescripcion = document.createElement('TD');
            const tdFecha = document.createElement('TD');
            const tdBtnEditar = document.createElement('TD');
            const tdbtnBorrar = document.createElement('TD');

            // CREANDO VALORES DE TD'S
            const inputChk = document.createElement('INPUT');
            inputChk.setAttribute('type','checkbox');
            inputChk.setAttribute('name','checkInput');
            inputChk.setAttribute('id','chkInput');
            tdDescripcion.innerHTML = `
                <p class="tittle">${tittle_task}</p>
                <p class="descripcion">${descripcion} </p>
            `;
            tdFecha.innerHTML = ` <p> ${fechaLimite} </p>`;
            tdBtnEditar.innerHTML = `
                <button type="button" class="btn btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                        <path d="M10.507 10.498l-1.507 1.502v3h3l1.493 -1.498m2 -2.01l4.89 -4.907a2.1 2.1 0 0 0 -2.97 -2.97l-4.913 4.896" />
                        <path d="M16 5l3 3" />
                        <path d="M3 3l18 18" />
                    </svg>
                </button>
            `;
            tdbtnBorrar.innerHTML = `
                <button type="button" class="btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" stroke-width="0" fill="currentColor" />
                        <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" stroke-width="0" fill="currentColor" />
                    </svg>
                </button>
            `;


            // INSERTANDO EN TD
            tdCheck.appendChild(inputChk);

            // INSERTANDO EN TR
            tr.appendChild(tdColor);
            tr.appendChild(tdCheck);
            tr.appendChild(tdDescripcion);
            tr.appendChild(tdFecha);
            tr.appendChild(tdBtnEditar);
            tr.appendChild(tdbtnBorrar);

            document.querySelector('#tbody-task').appendChild(tr);
        });

       
    }

    cambiarColorTd(color, id_task){
        const tr = document.querySelector(`#${id_task}`);
        tr.firstChild.setAttribute('style',`background-color:${color}`);
    }
}

export default UITask;