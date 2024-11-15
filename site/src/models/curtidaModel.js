var database = require("../database/config")

function listar(idPostagem, idUsuario) {
    var instrucaoSql = `
        SELECT fk_postagem
        FROM Curtida AS c
        JOIN Usuario AS u
            ON id_usuario = fk_usuario
                WHERE fk_usuario = ${idUsuario} AND fk_postagem = ${idPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};