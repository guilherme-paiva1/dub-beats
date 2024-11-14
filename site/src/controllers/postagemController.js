var postagemModel = require("../models/postagemModel");

function publicar(req, res) {
    var titulo = req.body.tituloServer;
    var conteudo = req.body.conteudoServer;
    var id_usuario = req.body.idServer;

    if (titulo == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (conteudo == undefined) {
        res.status(400).send("O conteúdo está indefinido!");
    } else {
        postagemModel.publicar(titulo, conteudo, id_usuario)
            .then(
                function (resultadoPublicar) {
                    console.log(resultadoPublicar);
                    res.json(resultadoPublicar);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao publicar! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function listar(req, res) {
    console.log('entrou no controller')
    postagemModel.listar()
        .then(
            function (resultadoListar) {
                res.json(resultadoListar);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao listar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    publicar,
    listar
}