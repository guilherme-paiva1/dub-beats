var id = sessionStorage.ID_USUARIO;
recuperarBio(id);
//if id na url igual ao id na session storage

//if id na url diferente do id na session storage
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

function recuperarBio(id) {
    fetch("/usuarios/recuperarBio", {
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
                campo_bio.value = json[0].bio;
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