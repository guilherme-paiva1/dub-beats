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
            alert("Publicado com sucesso!")
            location.reload();
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

            resposta.json().then(json => {
                var tamanho_lista = json.length - 1;
                var publicacoes = '';

                for (var i = tamanho_lista; i >= 0; i--) {
                    var idAtual = json[i].id_postagem;
                    var tituloAtual = json[i].titulo;
                    var conteudoAtual = json[i].conteudo;
                    var nomeAtual = json[i].nome;
                    var fkUsuario = json[i].fk_usuario;
                    var qtdCurtidasAtual = json[i].qtd_curtida
                    publicacoes += `

                    <div class="div-publicacao">
                        <div class="div-cabecalho-publicacao">
                            <a href="perfil.html?id=${fkUsuario}"><h3>${nomeAtual}</a> publicou:</h3>
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
                                <div class="div-comentario">
                                    <input type="text" disabled id="comentar_pub${idAtual}">
                                    <i class="bi bi-arrow-right-circle-fill escondido" id="btn_enviar${idAtual}" onclick="enviarComentario(${idAtual})"></i>
                                </div>
                                <div class="div-icones">
                                    <i class="bi bi-chat" id="icone_chat${idAtual}" onclick="abrirInputComentario(${idAtual})"></i>
                                    <span class="qtd-curtidas">
                                        <i class="bi bi-heart" onclick="curtir(${idAtual}, ${id_usuario})" id="curtir_pub${idAtual}"></i>
                                        <span id="num_curtidas${idAtual}"</span> ${qtdCurtidasAtual} 
                                    </span>
                                </div>
                            </span>
                        </div>
                        <div class="div-interagir">
                            <span class="comentarios-interagir" onclick="listarComentarios(${idAtual})" id="texto_comentario${idAtual}">
                                Ver comentários dessa publicação
                            </span>
                            <div class="div-comentarios" id="comentarios_publicacao${idAtual}"></div>
                        </div>
                    </div>
                    `;
                    listarCurtidas(idAtual, id_usuario);
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


function curtir(idPostagem, idUsuario) {
    var textoCurtir = `curtir_pub${idPostagem}`;
    var curtir_pub = document.getElementById(textoCurtir);

    var listaClassesDOM = curtir_pub.classList;
    var listaClasses = Array.from(listaClassesDOM);

    var incluiVazio = listaClasses.includes('bi-heart');

    if (incluiVazio) {
        curtir_pub.classList.remove('bi-heart');

        fetch("/postagens/curtir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idPostagemServer: idPostagem,
                idUsuarioServer: idUsuario
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                var texto = `num_curtidas${idPostagem}`;
                var elementoHTML = document.getElementById(texto);
                var elementoHTMLCurtidas = elementoHTML.innerHTML;

                var num_curtidas = Number(elementoHTMLCurtidas);
                num_curtidas++;

                curtir_pub.classList.add('bi-heart-fill');
                curtir_pub.classList.remove('bi-heart');
                elementoHTML.innerHTML = num_curtidas;
            } else {

                console.log("Houve um erro ao curtir, tente novamente mais tarde");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    } else {

        fetch("/curtidas/descurtir", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idPostagemServer: idPostagem,
                idUsuarioServer: idUsuario
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                var texto = `num_curtidas${idPostagem}`;
                var elementoHTML = document.getElementById(texto);
                var elementoHTMLCurtidas = elementoHTML.innerHTML;

                var num_curtidas = Number(elementoHTMLCurtidas);
                num_curtidas--;

                curtir_pub.classList.remove('bi-heart-fill');
                curtir_pub.classList.add('bi-heart');
                elementoHTML.innerHTML = num_curtidas;

            } else {
                console.log("Houve um erro ao curtir, tente novamente mais tarde");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;

    }
}

function listarCurtidas(idPostagem, idUsuario) {
    fetch("/curtidas/listar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idPostagemServer: idPostagem,
            idUsuarioServer: idUsuario
        })
    }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(json => {
                if (json[0]) {
                    var textoCurtir = `curtir_pub${idPostagem}`;
                    var curtir_pub = document.getElementById(textoCurtir);

                    curtir_pub.classList.remove("bi-heart");
                    curtir_pub.classList.add("bi-heart-fill");
                }

            });

        } else {

            console.log("Houve um erro ao confirmar sua curtida, tente novamente mais tarde");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function abrirInputComentario(idPostagem) {
    var textoInput = `comentar_pub${idPostagem}`;
    var textoBtn = `btn_enviar${idPostagem}`;
    var textoIcone = `icone_chat${idPostagem}`;
    var inputComentario = document.getElementById(textoInput);
    var btnComentario = document.getElementById(textoBtn);
    var icone = document.getElementById(textoIcone);

    inputComentario.value = '';
    if (inputComentario.disabled == true) {
        icone.classList.remove("bi-chat");
        icone.classList.add("bi-x-circle");
        inputComentario.disabled = false;
        inputComentario.style.width = '95%';
        setTimeout(function () {
            btnComentario.style.display = 'flex';
        }, 300);

    } else {
        icone.classList.remove("bi-x-circle");
        icone.classList.add("bi-chat");
        inputComentario.disabled = true;
        btnComentario.style.display = 'none';
        inputComentario.style.width = '100%';
    }

}

function enviarComentario(idPostagem) {
    var idUsuario = sessionStorage.ID_USUARIO;
    var textoInput = `comentar_pub${idPostagem}`;
    var comentarioHTML = document.getElementById(textoInput);
    var conteudoComentario = comentarioHTML.value; 

    fetch("/comentarios/comentar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idPostagemServer: idPostagem,
            idUsuarioServer: idUsuario,
            conteudoServer: conteudoComentario
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            abrirInputComentario(idPostagem);
            listarComentarios(idPostagem);
        } else {
            console.log("Houve um erro ao comentar, tente novamente mais tarde");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function listarComentarios(idPostagem) {
    fetch("/comentarios/listar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idPostagemServer: idPostagem
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            document.getElementById(`texto_comentario${idPostagem}`).innerHTML = '';
            var elementoHTML = document.getElementById(`comentarios_publicacao${idPostagem}`);

            resposta.json().then(json => {
                if(json.length >= 1) {
                    var tamanho_lista = json.length - 1;
                    var comentarios = '';
    
                    for (var i = tamanho_lista; i >= 0; i--) {
                        var idAtual = json[i].id_comentario;
                        var fkUsuario = json[i].fk_usuario;
                        var conteudoAtual = json[i].conteudo;
                        var nomeAtual = json[i].nome;
                        comentarios += `
                        <div class="div-comentario-lista">
                            <div class="div-cabecalho-publicacao">
                                <a href="perfil.html?id=${fkUsuario}"><h4>${nomeAtual}</a>:</h4>
                            </div>
                            <div class="conteudo-comentario">
                                <span>${conteudoAtual}</span>
                            </div>
                        </div>
                        `;
                    }
                    //console.log(comentarios)
                    elementoHTML.innerHTML = comentarios;
                } else {
                    elementoHTML.innerHTML = 'Ainda não há comentários!';
                }

            });
        } else {
            console.log("Houve um erro ao listar comentários, tente novamente mais tarde");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}