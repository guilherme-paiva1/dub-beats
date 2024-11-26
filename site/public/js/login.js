function entrar() {
    var emailVar = input_email_login.value;
    var senhaVar = input_senha_login.value;

    if (emailVar == "" || senhaVar == "") {
        alert('Preencha todos os campos!');
        return false;
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            aparecerMensagemLogin('Login realizado com sucesso! Indo para o feed...');

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json[0].email;
                sessionStorage.NOME_USUARIO = json[0].nome;
                sessionStorage.ID_USUARIO = json[0].id_usuario;
                setTimeout(function () {
                   window.location = "../private/feed.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {
            aparecerMensagemLogin('Login ou senha incorretos!');           
        }

    }).catch(function (erro) {
        console.warn(erro);
    })

    return false;
}

function aparecerMensagemLogin(texto) {
    span_retorno_login.innerHTML = texto;
}