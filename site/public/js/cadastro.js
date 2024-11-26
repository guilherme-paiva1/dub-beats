function cadastrar() {
  var nomeVar = input_nome_cadastro.value;
  var emailVar = input_email_cadastro.value;
  var senhaVar = input_senha_cadastro.value;
  var confirmacaoSenhaVar = input_confirmar_senha_cadastro.value;

  // Verificando se há algum campo em branco
  if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
    aparecerMensagem("Todos os campos devem estar preenchidos!");
    return false;
  } 

  if (!verificarSenha(senhaVar)) { 
    aparecerMensagem('A senha precisa ter ao menos 1 caractere especial e 1 número!');
    return false;
  }

  if(!verificarEmail(emailVar)) {
    aparecerMensagem('O email deve ser válido! (Não aceitamos emails institucionais, apenas emails pessoais)');
    return false;
  }

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
          limparFormulario();
          sumirMensagem();
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

function verificarSenha(senha) {
  var incluiEspecial = 
    senha.includes('!') ||
    senha.includes('@') ||
    senha.includes('#') ||
    senha.includes('$') ||
    senha.includes('%') ||
    senha.includes('&') ||
    senha.includes('*')
  ;  

  var incluiNumero = 
    senha.includes('0') ||
    senha.includes('1') ||
    senha.includes('2') ||
    senha.includes('3') ||
    senha.includes('5') ||
    senha.includes('6') ||
    senha.includes('7') ||
    senha.includes('8') ||
    senha.includes('9') 
  ;

  if (incluiEspecial && incluiNumero) {
    return true;
  }

  return false;
}

function verificarEmail(email) {
  var temArroba = email.includes('@');  

  var terminaCerto = 
    email.endsWith('.com') ||  
    email.endsWith('.net') ||
    email.endsWith('.me') ||
    email.endsWith('.br') ||
    email.endsWith('.it') ||
    email.endsWith('.fr') ||
    email.endsWith('.uk') ||
    email.endsWith('.de') ||
    email.endsWith('.ru')
  ;

  if (temArroba && terminaCerto) {
    return true;
  }

  return false;
}

function limparFormulario() {
  input_nome_cadastro.value = '';
  input_email_cadastro.value = '';
  input_senha_cadastro.value = '';
  input_confirmar_senha_cadastro.value = '';

}