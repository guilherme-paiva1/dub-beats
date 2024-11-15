function cadastrar() {
  // aguardar();

  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var nomeVar = input_nome_cadastro.value;
  var emailVar = input_email_cadastro.value;
  var senhaVar = input_senha_cadastro.value;
  var confirmacaoSenhaVar = input_confirmar_senha_cadastro.value;

  // Verificando se há algum campo em branco
  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == ""
  ) {
    span_situacao.innerHTML =
      "Preencha todos os campos para continuar!";
    return false;
  } else {
    sumirMensagem();
  }

  // Enviando o valor da nova input
  //fetch = buscar
  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      //content type = tipo de conteúdo
      "Content-Type": "application/json",
    },
    //body = conteúdo dessa requisição
    //req é onde vamos acessar esse body
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js

      // cada chave é um 'apelido' para um índice
      //dentro de um json, antes do : -> é chave,
      // depois dos : -> é valor
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      //resposta veio em um alcance sem erro 1xx até 2xx
      if (resposta.ok) {
        aparecerMensagem("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

        setTimeout(() => {
          exibirLogin();
        }, "2000");

        //resposta veio em um alcance entre 3xx até 5xx
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}

function sumirMensagem() {
  span_retorno_cadastro.innerHTML = "";
}

function aparecerMensagem(texto) {
  span_retorno_cadastro.innerHTML = texto;
}