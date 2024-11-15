//if id na url igual ao id na session storage
var parametros = new URLSearchParams(window.location.search);
var id = parametros.get('id');

manipularInformacoesUsuario(id);

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

    //listarPublicacoesDoUsuario();
}

function mostrarInformacoes() {
    var div_informacoes = document.getElementById("div_informacoes");
    var btn_informacoes = document.getElementById("btn_informacoes")
    var div_publicacoes = document.getElementById("div_publicacoes");
    var btn_publicacoes = document.getElementById("btn_publicacoes")

    //manipulação dos botões
    btn_informacoes.classList.add("selecionado");
    btn_publicacoes.classList.remove("selecionado");

    //manipulação da div
    div_publicacoes.style.display = 'none';
    div_informacoes.style.display = 'flex';

    //listarInformacoesDoUsuario();
}