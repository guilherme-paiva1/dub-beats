var database = require("../database/config")

function publicar(titulo, conteudo, id_usuario) {
    var instrucaoSql = `
        INSERT INTO Postagem(titulo, conteudo, fk_usuario) VALUES
            ('${titulo}', '${conteudo}', '${id_usuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    var instrucaoSql = `
        SELECT 
            u.nome AS nome, 
            p.id_postagem AS id_postagem, 
            p.titulo AS titulo, 
            p.conteudo AS conteudo, 
            p.fk_usuario AS fk_usuario
        FROM Postagem AS p
        JOIN Usuario AS u
            ON id_usuario = fk_usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    publicar,
    listar
};