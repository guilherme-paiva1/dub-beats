var database = require("../database/config")

function publicar(titulo, conteudo, id_usuario) {
    var instrucaoSql = `
        INSERT INTO Postagem(titulo, conteudo, fk_usuario) VALUES
            ('${titulo}', '${conteudo}', '${id_usuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    publicar
};