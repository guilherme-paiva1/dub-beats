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

function cadastrar(nome, email, senha) {   
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha) VALUES 
            ('${nome}', '${email}', MD5('${senha}'));
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function atualizarBio(bio, id) {   
    var instrucaoSql = `
        UPDATE Usuario 
            SET bio = '${bio}' 
                WHERE id_usuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function recuperarInfos(id) {   
    var instrucaoSql = `
        SELECT id_usuario, nome, bio 
            FROM Usuario
                WHERE id_usuario = ${id};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarEstatisticasModel(id) {
    var instrucaoSql = `
    SELECT
	    (SELECT count(id_curtida) FROM Curtida WHERE fk_usuario = ${id}) AS qtd_curtida,
        (SELECT count(id_comentario) FROM Comentario WHERE fk_usuario = ${id}) AS qtd_comentario,
        (SELECT count(id_postagem) FROM Postagem WHERE fk_usuario = ${id}) AS qtd_postagem; 
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    atualizarBio,
    recuperarInfos,
    listarEstatisticasModel
};