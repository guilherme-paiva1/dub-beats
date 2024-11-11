function curtir() {
    var listaClassesDOM = curtir_pub.classList;
    var listaClasses = Array.from(listaClassesDOM);
    var incluiVazio = listaClasses.includes('bi-heart');

    if (incluiVazio) {
        curtir_pub.classList.remove('bi-heart');
        curtir_pub.classList.add('bi-heart-fill');
    } else {
        curtir_pub.classList.remove('bi-heart-fill');
        curtir_pub.classList.add('bi-heart');
    }
}

function abrirInputComentario() {
    comentar_pub.disabled = false;
}