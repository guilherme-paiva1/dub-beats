campo_bio.disabled = true;
function manipularBio() {
    if (campo_bio.disabled == true) {
        campo_bio.disabled = false;
        btn_salvar.style.height = '100px';
        btn_salvar.style.width = '150px';
        btn_salvar.style.fontSize = '15px';
        btn_salvar.style.opacity = '1';
    } else {
        campo_bio.disabled = true;
        btn_salvar.style.height = '0';
        btn_salvar.style.width = '0';
        btn_salvar.style.opacity = '0';
        btn_salvar.style.fontSize = '0';
    }
}