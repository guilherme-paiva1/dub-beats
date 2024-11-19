var database = require("../database/config")

function comentar(fkUsuario, fkPostagem, conteudo) {
    var instrucaoSql = `
        INSERT INTO Comentario(fk_usuario, fk_postagem, conteudo) VALUES
            ('${fkUsuario}', '${fkPostagem}', '${conteudo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    comentar
};