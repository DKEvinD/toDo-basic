class UI {
    viewAgregarCat(){
        const formAgregarCat = document.createElement('FORM');
        formAgregarCat.setAttribute('id', 'form-agregar-cat');
        formAgregarCat.innerHTML =`
            <div class="mb-3">
                <label for="CAT_Name" class="form-label">Nombre</label>
                <input type="text" name="CAT_Name" id="CAT_Name" class="form-control">
            </div>
            <div class="mb-3">
                <label for="CAT_Color" class="form-label">Color</label>
                <input type="color" name="CAT_Color" id="CAT_Color" class="form-control">
            </div>
            <button type="button" class="btn btn-success" id="insertarCat"> Agregar </button>
        `;

        return formAgregarCat;
    }


}

export default UI;