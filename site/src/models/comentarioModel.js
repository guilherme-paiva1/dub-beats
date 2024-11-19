var database = require("../database/config")

function comentar(fkUsuario, fkPostagem, conteudo) {
    var instrucaoSql = `
        INSERT INTO Comentario(fk_usuario, fk_postagem, conteudo) VALUES
            ('${fkUsuario}', '${fkPostagem}', '${conteudo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(fkPostagem) {
    var instrucaoSql = `
        SELECT 
            id_comentario,
            fk_usuario, 
            conteudo,
            nome 
            FROM Comentario
            JOIN Usuario
                ON id_usuario = fk_usuario
                    WHERE fk_postagem = ${fkPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    comentar,
    listar
};