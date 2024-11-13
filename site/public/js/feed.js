function publicar() {
    var titulo = input_titulo.value;
    var conteudo = input_conteudo.value;
    var id_usuario = sessionStorage.ID_USUARIO;

    fetch("/postagens/publicar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tituloServer: titulo,
            conteudoServer: conteudo,
            idServer: id_usuario
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                alert("Publicado com sucesso!")
                location.reload();
            });

        } else {

            console.log("Houve um erro ao publicar, tente novamente mais tarde");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

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