var id_usuario = sessionStorage.ID_USUARIO;
function publicar() {
    var titulo = input_titulo.value;
    var conteudo = input_conteudo.value;

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

function listarPublicacoes() {
    fetch("/postagens/listar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            
            resposta.json().then(json => {
                var tamanho_lista = json.length - 1;
                var publicacoes = '';

                for(var i = tamanho_lista; i >= 0; i--) {
                    console.log('entrou no for')
                    var idAtual = json[i].id_postagem;
                    var tituloAtual = json[i].titulo;
                    var conteudoAtual = json[i].conteudo;
                    var nomeAtual = json[i].nome;
                    console.log(`${idAtual}, ${tituloAtual}, ${conteudoAtual}`);
                    publicacoes += `

                    <div class="div-publicacao">
                        <div class="div-cabecalho-publicacao">
                            <h3>${nomeAtual} publicou:</h3>
                        </div>
                        <div class="div-conteudo-publicacao">
                            <div class="div-titulo">
                                <h4>${tituloAtual}</h4>
                            </div>
                            <div class="div-conteudo">
                                <p>${conteudoAtual}
                                </p>
                            </div>
                            <span class="icons-interagir">
                                <input type="text" disabled onclick="abrirInputComentario(${idAtual})" id="comentar_pub">
                                <i class="bi bi-chat" onclick="abrirInputComentario(${idAtual})"></i>
                                <i class="bi bi-heart" onclick="curtir(${idAtual, id_usuario})" id="curtir_pub"></i>
                            </span>
                        </div>
                        <div class="div-interagir">
                            <span class="comentarios-interagir" onclick="listarComentarios()" id="comentarios_publicacao1">
                                Ver comentários dessa publicação
                            </span>
                        </div>
                    </div>
                    `;
                }
                //console.log(publicacoes)
                div_feed.innerHTML = publicacoes;
                
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