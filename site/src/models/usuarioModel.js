var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id_usuario, nome, email 
            FROM Usuario WHERE email = '${email}' 
                AND senha = MD5('${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {   
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha) VALUES 
            ('${nome}', '${email}', MD5('${senha}'));
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    //retorna a execução no banco de dados
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function atualizarBio(bio, id) {   
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        UPDATE Usuario 
            SET bio = '${bio}' 
                WHERE id_usuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function recuperarInfos(id) {   
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SELECT id_usuario, nome, bio 
            FROM Usuario
                WHERE id_usuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    atualizarBio,
    recuperarInfos
};