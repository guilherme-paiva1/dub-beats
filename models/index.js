function exibirCadastro() {
    header_login.classList.add('unactive');
    header_cadastro.classList.remove('unactive');

    body_login.classList.add('unactive');
    body_cadastro.classList.remove('unactive');

    footer_login.classList.add('unactive');
    footer_cadastro.classList.remove('unactive');
}

function exibirLogin() {
    header_cadastro.classList.add('unactive');
    header_login.classList.remove('unactive');

    body_cadastro.classList.add('unactive');
    body_login.classList.remove('unactive');

    footer_cadastro.classList.add('unactive');
    footer_login.classList.remove('unactive');
}