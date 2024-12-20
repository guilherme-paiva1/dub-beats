//if id na url igual ao id na session storage
var parametros = new URLSearchParams(window.location.search);
var id = parametros.get('id');

manipularInformacoesUsuario(id);
listarPublicacoesDoUsuario();

//if id na url diferente do id na session storage
campo_bio.disabled = true;
function manipularBio() {
    if (campo_bio.disabled == true) {
        campo_bio.disabled = false;
        btn_salvar.style.height = '50px';
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

function salvarAlteracoes() {
    var bio = campo_bio.value;
    var id = sessionStorage.ID_USUARIO;

    fetch("/usuarios/atualizarBio", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bioServer: bio,
            idServer: id
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                alert('Bio atualizada com sucesso!')
                location.reload();
            });

        } else {

            console.log("Houve um erro ao atualizar a bio!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function recuperarInfos(id) {
    fetch("/usuarios/recuperarInfos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: id
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                if (json[0].id_usuario == sessionStorage.ID_USUARIO) {
                    manipular_bio.style.display = 'flex';
                }

                campo_bio.value = json[0].bio;
                nome_usuario.innerHTML = json[0].nome;

            });

        } else {

            console.log("Houve um erro ao atualizar a bio!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function manipularInformacoesUsuario(id) {
    recuperarInfos(id);
}

function mostrarPublicacoes() {
    var div_publicacoes = document.getElementById("div_publicacoes");
    var btn_publicacoes = document.getElementById("btn_publicacoes")
    var div_informacoes = document.getElementById("div_informacoes");
    var btn_informacoes = document.getElementById("btn_informacoes")

    //manipulação dos botões
    btn_publicacoes.classList.add("selecionado");
    btn_informacoes.classList.remove("selecionado");

    //manipulação das divs
    div_informacoes.style.display = 'none';
    div_publicacoes.style.display = 'flex';

    listarPublicacoesDoUsuario();
}

function mostrarInformacoes() {
    var div_informacoes = document.getElementById("div_informacoes");
    var btn_informacoes = document.getElementById("btn_informacoes")
    var div_publicacoes = document.getElementById("div_publicacoes");
    var btn_publicacoes = document.getElementById("btn_publicacoes");

    //manipulação dos botões
    btn_informacoes.classList.add("selecionado");
    btn_publicacoes.classList.remove("selecionado");

    //manipulação da div
    div_publicacoes.style.display = 'none';
    div_informacoes.style.display = 'flex';

    listarEstatisticasDoUsuario();
}

function listarPublicacoesDoUsuario() {
    fetch("/postagens/listarPorUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: id
        })
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
                div_publicacoes.innerHTML = publicacoes;

            });

        } else {

            console.log("Houve um erro ao listar as publicações do usuário!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function listarEstatisticasDoUsuario() {
    fetch("/usuarios/listarEstatisticasUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: id
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                var qtdCurtidas = json[0].qtd_curtida;
                var qtdComentarios = json[0].qtd_comentario;
                var qtdInteracao = qtdCurtidas + qtdComentarios;
                var qtdPublicacoes = json[0].qtd_postagem;
                var status = '';

                if (qtdInteracao >= 0 && qtdInteracao <= 10 && qtdPublicacoes >= 0 && qtdPublicacoes < 5) {
                    status = 'Curioso';
                } else if (qtdInteracao >= 11 && qtdInteracao <= 20 && qtdPublicacoes >= 5 && qtdPublicacoes < 10) {
                    status = 'Noob';
                } else if (qtdInteracao >= 21 && qtdInteracao <= 30 && qtdPublicacoes >= 10 && qtdPublicacoes < 15) {
                    status = 'Baby Banger';
                } else if (qtdInteracao >= 31 && qtdInteracao <= 50 && qtdPublicacoes >= 15 && qtdPublicacoes < 30) {
                    status = 'Headbanger';
                } else if (qtdInteracao > 50 && qtdPublicacoes >= 30) {
                    status = 'Headbanger das trevas';
                } else {
                    status = 'Curioso';
                }
                

                span_qtdInt.innerHTML = qtdInteracao;
                span_qtdPub.innerHTML = qtdPublicacoes;
                span_status.innerHTML = status;
                                
                plotarGrafico(qtdCurtidas, qtdComentarios);
            });

        } else {

            console.log("Houve um erro ao listar as publicações do usuário!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

function plotarGrafico(curtidas, comentarios) {
    var chart = document.getElementById('grafico_relacao');

    new Chart(chart, {
        type: 'pie',
        data: {
            labels: ['Curtidas', 'Comentários'],
            datasets: [{
                label: 'Relação do histórico de interações',
                data: [curtidas, comentarios],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Relação do seu histórico de interações'
                },
                legend: {
                    display: true
                }
            }
        }
    });
}